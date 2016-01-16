var mysql   = require("mysql");

function stock(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
stock.prototype.handleRoutes = function(router,connection,md5)
{
  router.post("/insertStok",function(req,res){
     //request id
     var id = req.body.id;
     //request nama
     var nama = req.body.nama;
     //request jumlah
     var jumlah = req.body.jumlah;
     //request satuan
     var satuan = req.body.satuan;
     //request hargaTotal
     var hargaTotal = req.body.hargaTotal;


     //query checking id jika sama
     var query1 = "select id from stock where id = ?";
     var table1 = [id];
     query1 = mysql.format(query1,table1);

     connection.query(query1,function(err,temp)
     {
        //Jika id stock belum ada di database
        if(temp.length == 0 )
        {
            //query insert
            var query = "INSERT INTO `stock` (id,nama,jumlah,satuan,hargaTotal) VALUES (?,?,?,?,?)";
            var table = [id,nama,jumlah,satuan,hargaTotal];
            query = mysql.format(query, table);

            connection.query(query,function(err,temp){
              if(err)
              {
                  res.json({"message":err});
              }
              else
              {

                  res.json({"message":"input stock berhasil dengan id "+id});
              }
            });
        }
        else if(err)
        {
          res.json({"message":err})
        }
        //Jika id stock sudah ada di database
        else
        {
          res.json({"message":"id "+id+ " sudah ada di database!"});
        }
     });
 });
  //--input stock end..

  // kurangin stok param(id,jumPengurangan)
  router.post("/kurangStok",function(req,res){
     //request nama
     //var id = req.body.id;
     var nama = req.body.nama;
     //request jumlah
     var jumPengurangan = req.body.jumPengurangan;

     //query cek id di db
     var queryKode = "select id from stock where nama ='"+nama+"'" ;
     //var tableKode = [nama];
    // queryKode = mysql.format(queryKode,tableKode);
     connection.query(queryKode,function(err,temp)
     {
         //jika id tidak ada di db
         if(temp.length==0)
         {
             res.json({"message":"Kode input tidak ada di db "});
         }
         else if(err)
         {
           res.json({"message":err})
         }
         else
         {
              //query jumlah stock cukup apa ga
              var query1 = "select jumlah,hargaTotal from stock where nama = '"+nama+"'";
              //var table1 = [id];
            //  query1 = mysql.format(query1,table1);

              connection.query(query1,function(err,temp)
              {
                  //Jika stok stock cukup
                  if(temp[0].jumlah-jumPengurangan>=0 )
                  {
                      //query pengurangan
                      var query = "UPDATE `stock` SET `hargaTotal`=?,`jumlah`=? WHERE nama ='"+nama+"'";
                      var jumStokbaru = temp[0].jumlah - jumPengurangan;
                      var hargaTotalBaru = Number(temp[0].hargaTotal - (temp[0].hargaTotal / temp[0].jumlah));
                      var table = [hargaTotalBaru,jumStokbaru];
                      query = mysql.format(query, table);

                      connection.query(query,function(err,temp){
                      if(err)
                      {
                          res.json({"message":err});
                      }
                      else
                      {

                          res.json({"message":"pengurangan stok berhasil.. sisa stok "+jumStokbaru});
                      }
                      });

                  }
                  //Jika stok stock tidak cukup
                  else
                  {
                      res.json({"message":"error"});
                  }
              });
         }

     });

 });
  //--kurangin stock end..

  // tambah stok param(id,jumPenambahan,harga)
  router.post("/tambahStok",function(req,res){
     //request nama
     var id = req.body.id;
     //request jumlah
     var jumPenambahan = req.body.jumPenambahan;
     //request harga
     var harga = req.body.harga;

     //query cek id di db
     var queryKode = "select id from stock where id = ?" ;
     var tableKode = [id];
     queryKode = mysql.format(queryKode,tableKode);
     connection.query(queryKode,function(err,temp)
     {
         //jika id tidak ada di db
         if(temp.length==0)
         {
             res.json({"message":"Kode input tidak ada di db "});
         }
         else
         {
              //query jumlah stock cukup apa ga
              var query1 = "select jumlah,hargaTotal from stock where id = ?";
              var table1 = [id];
              query1 = mysql.format(query1,table1);

              connection.query(query1,function(err,temp)
              {
                  var jumStokbaru = temp[0].jumlah - (-jumPenambahan);
                  var jumHargaBaru = temp[0].hargaTotal - (-harga);
                  //Jika penambahan melebihi kuota
                  if(jumStokbaru >= 255)
                  {
                      res.json({"message":"Penambahan melebihi kuota stok.. stok "+temp[0].jumlah});
                  }
                  else if(err)
                  {
                    res.json({"message":err})
                  }
                  //Jika stock cukup
                  else
                  {
                      //query penambahan
                      var query = "UPDATE `stock` SET `hargaTotal`=?,`jumlah`=? WHERE id = ?";
                      var table = [jumHargaBaru,jumStokbaru,id];
                      query = mysql.format(query, table);

                      connection.query(query,function(err,temp){
                      if(err)
                      {
                          res.json({"message":err});
                      }
                      else
                      {

                          res.json({"message":"penambahan stok berhasil.. stok "+jumStokbaru});
                      }
                      });

                  }

              });
         }

     });

 });
  //--tambah stock end..

  //untuk show smua stock yang aad di table stock
  router.post("/showstok",function(req,res){
    connection.query("SELECT * FROM `stock`",function(err,rows){
      if (err) {
        res.json ({"message":"err .."+err});
      }else {
        res.json({"message":rows});
      }
    });
  });

// mendapatkan id dari sebuah stock
router.post("/getStokId",function(req,res){
  var nama = req.body.nama;
  connection.query("SELECT * FROM `stock` WHERE nama = '"+nama+"'",function(err,rows){
    if (err) {
      res.json({"message":"gagal mendapatkan id stock"});
    }else{
      res.json({"message":rows[0].id});
    }
  })
});

//update nama param (id, namaBaru)
router.post("/updateStock",function(req,res)
{
  //request id
  var id = req.body.id;
  //reques id baru
  var idBaru = req.body.idBaru;
  //request nama baru
  var namaBaru = req.body.namaBaru;
  //request jumlah baru
  var jumBaru = req.body.jumBaru;
  //request hargaBaru
  var harBaru = req.body.harBaru;
  //new
  //request satuanBaru
  var satuanBaru = req.body.satuanBaru;
  //query cek nama menu di db
  var queryLogin2 = "select id from stock where id = ?";
  var tableLogin2 = [id];
  queryLogin2 = mysql.format(queryLogin2,tableLogin2);

  connection.query(queryLogin2,function(err,temp)
  {
      //jika nama tidak cocok sama DB
      if(temp.length != 1)
      {
          res.json({"message":"id stock tidak ada di database"});
      }
      else if(err)
      {
        res.json({"message":err})
      }
      //jika nama cocok sama DB
      else
      {
          //query cek username di db
          var queryUpdate = "UPDATE `stock` SET `id` = ?, `nama`= ?,`jumlah`=?,`hargaTotal`=?,`satuan`=? WHERE id = ?";
          var tableUpdate= [idBaru,namaBaru,jumBaru,harBaru,satuanBaru,id];
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
                  res.json({"message":"Berhasil mengganti nama "});
              }
          });
      }
    });
});
//--update nama selesai...

//tambah/kurang kuantitas param(id,jumTambah) ex : tambah 100 (jumTambah = 100), kurang 100 (jumTambah = -100)
router.post("/tambahKuantitas",function(req,res){
   //request nama
   var id = req.body.id;
   //request jumlahBaru
   var jumTambah = req.body.jumTambah;

   //query cek id di db
   var queryKode = "select id from menu where id = ?" ;
   var tableKode = [id];
   queryKode = mysql.format(queryKode,tableKode);
   connection.query(queryKode,function(err,temp)
   {
       //jika id tidak ada di db
       if(temp.length==0)
       {
           res.json({"message":"Kode input tidak ada di db "});
       }
       else if(err)
       {
         res.json({"message":err})
       }
       else
       {
            //query jumlah stock cukup apa ga
            var query1 = "select kuantitas from menu where id = ?";
            var table1 = [id];
            query1 = mysql.format(query1,table1);

            connection.query(query1,function(err,temp)
            {
                var jumKuantitasBaru = temp[0].kuantitas - (-jumTambah);
                //Jika penambahan melebihi kuota
                if(jumStokbaru >= 255)
                {
                    res.json({"message":"Penambahan melebihi kuota stok.. stok "+temp[0].jumlah});
                }

                //Jika stock cukup
                else
                {
                    //query penambahan
                    var query = "UPDATE `menu` SET 'kuantitas' = ? WHERE id = ?";
                    var table = [jumKuantitasBaru, id];
                    query = mysql.format(query, table);

                    connection.query(query,function(err,temp){
                    if(err)
                    {
                        res.json({"message":err});
                    }
                    else
                    {

                        res.json({"message":"penambahan kuantitas berhasil.. kuantitas "+jumKuantitasBaru});
                    }
                    });
                }
            });
       }
   });
});
//--update kuantitas end..

router.post("/deleteStok",function(req,res){
  var id = req.body.id;
  connection.query("DELETE FROM `stock` WHERE id = '"+ id+"'",function(err,rows){
    if (err) {
      res.json({"message":"err..."+err});
    }else{
      res.json({"message":"berhasil hapus stok"});
    }
  })
})

router.get("/getStockThatEmpty",function(req,res){
  connection.query("SELECT nama FROM `stock` WHERE `status` = 'empty'",function(err,rows){
    if (err) {
      res.json({"message":"err..."+err});
    }else{
      res.json({"message":rows});
    }
  })
})

router.post("/reorderStok",function(req,res){
  var nama = req.body.nama;
  var query = "select jumlah FROM `stock` where nama= '"+nama+"'";
  connection.query(query,function(err,rows){
    if (err) {
      res.json({"message":"err..."+rows});
    }else{
      var jumlah = Number(rows[0].jumlah);
      if (jumlah<100) {
        connection.query("UPDATE `stock` SET `status`= 'empty' where nama = '"+nama+"'",function(err,sto){
          if (err) {
            res.json({"message":"err..."+rows});
          }else{
            res.json({"message":"stock ini hampir habis"});
          }
        });
      }
      else {
        connection.query("UPDATE `stock` SET `status`= 'ready' where nama = '"+nama+"'",function(err,sto){
          if (err) {
            res.json({"message":"err..."+rows});
          }else{
            // res.json({"message":"stock ini hampir habis"});
            res.json({"message":"stok aman"});
          }
        });
      }
    }
  })
})
}


module.exports = stock;
