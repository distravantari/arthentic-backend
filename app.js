var express = require("express"),
	mysql = require("mysql"),
	bodyParser = require("body-parser"),
	md5 = require('MD5'),
  http = require('http');

var APIarthenticModel = require("./model/APIarthentic.js");
var dashboardModel = require("./model/dashboard.js");
var authModel = require("./model/auth.js");
var reportModel = require("./model/report.js");
var menuModel = require("./model/menu.js");
var app = express();

var jwt = require('jsonwebtoken'); //jwt
app.set('superSecret', 'ilovenode8'); // secret variable

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


function connect(){
	var self = this;
	self.connectMysql();
};

connect.prototype.connectMysql = function() {
	// body...
	var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100,
        multipleStatements: true,

		//kalo mau coba local host
		host     : '127.0.0.1',
		user     : 'root',
		password : '',
		database : 'cafe',
        datestring : true,
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

connect.prototype.configureExpress = function(connection) {
	// body...
	var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

        // get an instance of the router for api routes
      var router = express.Router();
      // set /api
        router.post('/authenticate', function(req, res) {

           // if user is found and password is right
                // create a token
                var token = jwt.sign("user", app.get('superSecret'), {
                  expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                  success: true,
                  message: 'Enjoy your token!',
                  token: token
                });

        });

    // route middleware to verify a token
        router.use(function(req, res, next) {

          // check header or url parameters or post parameters for token
          var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token;

          // decode token
          if (token) {

            // verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {
              if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
              } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
              }
            });

          } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

          }
        });


      app.use('/api', router);

			var APIarthentic = new APIarthenticModel (router,connection,md5);
			var dashboard = new dashboardModel (router,connection,md5);
      var auth = new authModel(router,connection,md5);
			var report = new reportModel (router,connection,md5);
			var menu = new menuModel (router,connection,md5);
      self.startServer();
};

connect.prototype.startServer = function() {
	// body...
	app.listen(3000,function(){
          console.log("magic happend");
      });
};

connect.prototype.stop = function(err) {
	// body...
	console.log("ISSUE WITH MYSQL \n"+ err);
	process.exit(1);
};

new connect();
