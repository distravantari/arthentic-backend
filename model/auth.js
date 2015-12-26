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

  router.post("/updateUser",function(req,res)
  {
      //request id
      var id = req.body.id;
      //request id baru
      var idBaru = req.body.idBaru;
      //request nama baru
      var namaBaru = req.body.namaBaru;
      //request pass baru
      var passBaru = req.body.passBaru;
      //request role baru
      var roleBaru = req.body.roleBaru;
      //request permission baru
      var permissionBaru = req.body.permissionBaru;

      //query cek username dan password di db
      var queryLogin2 = "select id from user where id = ?";
      var tableLogin2 = [id];
      queryLogin2 = mysql.format(queryLogin2,tableLogin2);

      connection.query(queryLogin2,function(err,temp)
      {
          //jika nama tidak cocok sama DB
          if(temp.length != 1)
          {
              res.json({"message":"id tidak ada di database"});
          }
          else if(err)
          {
            res.json({"message":err})
          }
          //jika nama cocok sama DB
          else
          {
              //query cek username dan password di db
              var queryUpdate = "UPDATE `user` SET `id`=?,`nama`= ?,`password`=?,`role`=?,`permission`=? WHERE id = ?";
              var tableUpdate= [idBaru,namaBaru,md5(passBaru),roleBaru,permissionBaru,id];
              queryUpdate = mysql.format(queryUpdate,tableUpdate);

              connection.query(queryUpdate,function(err,temp)
              {
                  //jika query update tidak berhasil
                  if(err)
                  {
                      res.json({"message":queryUpdate});
                  }
                  //jika query update berhasil
                  else
                  {
                      res.json({"message":"Berhasil diUpdate"});
                  }
              });
          }
      });
  });
  //--update user selesai...

   //delete user
   router.post("/deleteUser",function(req,res)
   {
       //request nama yang di delete
       var nama_delete = req.body.nama_delete;

       //query cek username
       var queryDelete = "delete from user where nama = ?";
       var tableDelete = [nama_delete];
       queryLogin = mysql.format(queryDelete,tableDelete);

       connection.query(queryDelete,function(err,temp)
       {
           //jika delete gagal
           if(err)
           {
               res.json({"message":"error!"});
           }
           //jika delete berhasil
           else
           {
               res.json({"message":"Delete user dengan nama : "+name_delete+" berhasil"});
           }
       });
   });
   //--delete user end...


//cekPermission
router.post("/cekPermission",function(req,res){
  //request nama
  var nama = req.body.nama

  //query checking username jika sama
  var query1 = "select nama from user where nama = ?";
  var table1 = [nama];
  query1 = mysql.format(query1,table1);

  connection.query(query1,function(err,temp)
  {
    if(err){
      res.json({"message":err});
    }
    else{
     //Jika nama  ada di database
     if(temp.length == 1 )
     {
         //query insert
         var query = "select permission from user where nama = ?";
         var table = [nama];
         query = mysql.format(query, table);

         connection.query(query,function(err,temp){
           if(err)
           {
               res.json({"message":"Shit! "+query});
           }
           else
           {
               var tampung = temp[0].permission;
               var result = "";
               if(tampung.charAt(0)==1)
               {
                 result+="menu;";
               }
               if(tampung.charAt(1)==1)
               {
                 result+="stok;";
               }
               if(tampung.charAt(2)==1)
               {
                 result+="order;";
               }
               if(tampung.charAt(3)==1)
               {
                 result+="laporanKeuangan;";
               }
               res.json(result);
           }

         });
       }
       //Jika nama tidak ada di db
       else
       {
         res.json({"message":"cek permission gagal.. tidak ada nama di database"});
       }
     }
     });
   });
}


module.exports = auth;
