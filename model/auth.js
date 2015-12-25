var mysql   = require("mysql");

function auth(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
auth.prototype.handleRoutes = function(router,connection,md5)
{
  //registrasi
  router.post("/registrasi",function(req,res){
     //request nama
     var nama = req.body.nama;
     //request role
     var role = req.body.role;
     //request password
     var password = req.body.password;
    //request permission (berisi angka 11111,)
    var permission = req.body.permission;

     //query checking username jika sama
     var query1 = "select nama from user where nama = ?";
     var table1 = [nama];
     query1 = mysql.format(query1,table1);

     connection.query(query1,function(err,temp)
     {
       if(err){
         res.json({"message":err+" "+query1});
       }
       else{
        //Jika nama belum ada di database
        if(temp.length == 0 )
        {
            //query insert
            var query = "INSERT INTO `user` (nama,password,role,permission) VALUES (?,?,?,?)";
            var table = [nama,md5(password),role,permission];
            query = mysql.format(query, table);

            connection.query(query,function(err,temp){
              if(err)
              {
                  res.json({"message":err+" "+query});
              }
              else
              {

                  res.json({"message":"Registrasi berhasil atas nama "+nama});
              }
            });
        }
        //Jika nama sudah ada di database
        else
        {
          res.json({"message":"Registrasi gagal! "+"Nama "+nama+ " sudah ada di database!"});
        }
      }
     });
 });
  //--registrasi end...


  //login
  router.post("/login",function(req,res)
  {
      //request nama
      var nama = req.body.nama;
      //request password
      var password = req.body.password;

      //query cek username dan password di db
      var queryLogin = "select nama from user where nama = ? and password = ?";
      var tableLogin = [nama,md5(password)];
      queryLogin = mysql.format(queryLogin,tableLogin);

      connection.query(queryLogin,function(err,temp)
      {
          //jika nama dan password cocok sama DB
          if(temp.length != 1)
          {
              res.json({"message":"Nama atau password salah "});
          }
          else if(err)
          {
            res.json({"message":err})
          }
          //jika nama atau password tidak cocok sama DB
          else
          {
              res.json({"message":"Login berhasil. WELCOME "+nama })
          }
      });
  });
  //--login end...
}


module.exports = auth;
