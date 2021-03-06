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
        //new
        //request harga produksi
        var hargaProduksi = req.body.hargaProduksi;
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
                var query = "insert into `menu` (id,nama,komposisi,harga,hargaProduksi) VALUES (?,?,?,?,?)";
                var table = [id,nama,komposisi,harga,hargaProduksi];
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
          //new
          //request hargaProduksi
          var hargaProduksi = req.body.hargaProduksi;
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
                  var queryUpdate = "UPDATE `menu` SET `id`=?,`nama`= ?,`komposisi`=?,`harga`=?,`hargaProduksi`=? WHERE id = ?";
                  var tableUpdate= [idBaru,namaBaru,komposisiBaru,hargaBaru,hargaProduksi,id];
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

//set menu ready
router.get("/setMenuReady",function(req,res)
{
    //request id
    var id = req.params.id || req.query.id;

    //query cek nama menu di db
    var queryLogin2 = "UPDATE `menu` SET `status`='ready' WHERE `id` = ?";
    var tableLogin2 = [id];
    queryLogin2 = mysql.format(queryLogin2,tableLogin2);

    connection.query(queryLogin2,function(err,temp)
    {
        //jika nama tidak cocok sama DB
        if(err)
        {
            res.json({"message":"id menu tidak ada di database "+queryLogin2});
        }
        else
        {
          res.json({"message":"sukses"});
        }
      });
  });
 //--set ready selesai...

 // set empty start
 router.get("/setMenuEmpty",function(req,res){
     var id = req.params.id || req.query.id;
     var query = "SELECT `komposisi` FROM `menu` WHERE id='"+id+"'";
     connection.query(query,function(err,success){
       if(err){
         res.json({"message":query});
       }else{
        //  res.json({"message":success[0].komposisi});
        var komposisi = success[0].komposisi.split(',');
        // var kompo = komposisi[0].split(' ');
        var stat = 'ready';
        for (var i = 0; i < komposisi.length; i++) {
          var kompo = komposisi[i].split(' ');
          var queryStock = "SELECT `status` FROM `stock` WHERE nama ='"+kompo[0]+"'";
          connection.query(queryStock,function(err,sto){
            if(err){
              res.json({"message":queryStock});
            }else{
              // res.json({"message":sto[0].status});
              if(sto[0].status == 'empty'){
                connection.query("UPDATE `menu` SET `status` = 'empty' WHERE id='"+id+"'");
                stat ='empty';
              }else{
              }
            }

            console.log(stat);
          });
        }
          res.json({"message":'done'});
       }
     });
 });
 // set empty end
}




module.exports = menu;
