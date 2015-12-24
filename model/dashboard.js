var mysql   = require("mysql");

function dashboard(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
dashboard.prototype.handleRoutes = function(router,connection,md5)
{
  router.get("/usersTotal",function(req,res){
    // var id = req.body.id;
    connection.query("SELECT * FROM `user`",function(err,rows){
      if (err) {
        res.json({"message":"err..."+err});
      }else{
        res.json({"message":rows});
      }
    })
  });

  router.get("/membersTotal",function(req,res){
    // var id = req.body.id;
    connection.query("SELECT * FROM `customer`",function(err,rows){
      if (err) {
        res.json({"message":"err..."+err});
      }else{
        res.json({"message":rows});
      }
    })
  });

  router.get("/menuTotal",function(req,res){
    // var id = req.body.id;
    connection.query("SELECT * FROM `menu`",function(err,rows){
      if (err) {
        res.json({"message":"err..."+err});
      }else{
        res.json({"message":rows});
      }
    })
  })

  router.get("/ordersTotal",function(req,res){
    // var id = req.body.id;
    connection.query("SELECT * FROM `order`",function(err,rows){
      if (err) {
        res.json({"message":"err..."+err});
      }else{
        res.json({"message":rows});
      }
    })
  })
}


module.exports = dashboard;
