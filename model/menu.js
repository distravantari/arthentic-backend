var mysql   = require("mysql");

function menu(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
menu.prototype.handleRoutes = function(router,connection,md5)
{
  router.post("/showMenuById",function(req,res){
    var id = req.body.id;
    // var id = req.body.id;
    var query = "select * from `menu` WHERE id = '"+id+"' AND status ='ready'";
    connection.query(query,function(err,success){
        if(err){
            res.json({"message":"gagal menampilkan menu"+query})
        }else{
          if (success.length == 0) {
            res.json({"message":[{
              "id": "no",
              "nama": "menu habis/tidak ada"
            }]
          });
          }else{
            res.json({"message":success});
          }
        }
    });
  })

  // set stock with params name to empty
  router.post("/showMenuFromKomposition",function(req,res){
    var name = req.body.name;
    var temp = '';
    var query = "select komposisi,nama from `menu`";
    connection.query(query,function(err,success){
        if(err){
            res.json({"message":"gagal menampilkan menu"+query});
        }else{
          //for each
          for (var i = 0; i < success.length; i++) {
            var kompo = success[i].komposisi.split(",");
            // var namaStock = kompo[i].split(" ");
            for (var j = 0; j < kompo.length; j++) {
              var namaStock = kompo[j].split(" ");
              if (namaStock[0].toUpperCase() == name.toUpperCase()) {
                // temp += namaStock[0];
                connection.query("UPDATE `menu` SET `status`='empty' WHERE nama ='"+success[i].nama+"'");
              }
              // temp+= namaStock[0]+",";
            }
          }
          res.json({"message":success});
        }
    });
  })

  router.get("/showMenuById",function(req,res){
    var id = req.params.id || req.query.id;
    // var id = req.body.id;
    var query = "select * from `menu` WHERE id = '"+id+"' AND status = 'ready'";
    connection.query(query,function(err,success){
        if(err){
            res.json({"message":"gagal menampilkan menu"+query})
        }else{
            res.json({"message":success});
        }
    });
  })

//--update menu selesai...
  router.post("/showMenu",function(req,res){

      var query = "select * from `menu`";
      //sukses, kembalikan total harga
      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"gagal menampilkan menu"+query})
          }else{
              res.json({"message":success});
          }
      });
  });

  //insert menu param(id,nama,komposisi,harga,kuantitas)
      router.post("/inputMenu",function(req,res){
        //request id
        var id = req.body.id;
        //request nama
        var nama = req.body.nama;
        //request komposisi
        var komposisi = req.body.komposisi;
        //request harga
        var harga = req.body.harga;
        //request kuantitas
        //var kuantitas = req.body.kuantitas;

         //query checking id jika sudah ada yang sama
         var query1 = "select id from menu where id = ?";
         var table1 = [id];
         query1 = mysql.format(query1,table1);

         connection.query(query1,function(err,temp)
         {
            //Jika id menu belum ada di database
            if(temp.length == 0 )
            {
                //query insert
                var query = "insert into `menu` (id,nama,komposisi,harga) VALUES (?,?,?,?)";
                var table = [id,nama,komposisi,harga];
                query = mysql.format(query, table);

                connection.query(query,function(err,temp){
                  if(err)
                  {
                      res.json({"message":"failed "+query});
                  }
                  else
                  {

                      res.json({"message":"input menu berhasil dengan nama "+nama});
                  }
                });
            }
            else if(err)
            {
              res.json({"message":err})
            }
            //Jika barang sudah ada di database
            else
            {
              res.json({"message":err});
            }
         });
     });
      //--insert menu end..

      router.post("/deleteMenu",function(req,res){
        var id = req.body.id;
        connection.query("DELETE FROM `menu` WHERE id ='"+id+"'",function(err,rows){
          if (err) {
            res.json({"message":"err.. "+err});
          }else{
            res.json({"message":"success"});
          }
        })
      });

      //update nama param (id, namaBaru)
      router.post("/updateMenu",function(req,res)
      {
          //request id
          var id = req.body.id;

          //request id baru
          var idBaru = req.body.idBaru;
          //request nama baru
          var namaBaru = req.body.namaBaru;
          //request komposisi baru
          var komposisiBaru = req.body.komposisiBaru;
          //request harga baru
          var hargaBaru = req.body.hargaBaru;
          //request kuantitas baru
          //var kuantitasBaru = req.body.kuantitasBaru;

          //query cek nama menu di db
          var queryLogin2 = "select id from menu where id = ?";
          var tableLogin2 = [id];
          queryLogin2 = mysql.format(queryLogin2,tableLogin2);

          connection.query(queryLogin2,function(err,temp)
          {
              //jika nama tidak cocok sama DB
              if(temp.length != 1)
              {
                  res.json({"message":"id menu tidak ada di database"});
              }
              else if(err)
              {
                res.json({"message":err})
              }
              //jika nama cocok sama DB
              else
              {
                  //query cek username di db
                  var queryUpdate = "UPDATE `menu` SET `id`=?,`nama`= ?,`komposisi`=?,`harga`=? WHERE id = ?";
                  var tableUpdate= [idBaru,namaBaru,komposisiBaru,hargaBaru,id];
                  queryUpdate = mysql.format(queryUpdate,tableUpdate);

                  connection.query(queryUpdate,function(err,temp)
                  {
                      //jika query update tidak berhasil
                      if(err)
                      {
                          res.json({"message":err});
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
        //--update nama selesai...
}


module.exports = menu;
