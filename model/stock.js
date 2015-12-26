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
            var query = "INSERT INTO `stock` (id,nama,jumlah,hargaTotal) VALUES (?,?,?,?)";
            var table = [id,nama,jumlah,hargaTotal];
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
     var id = req.body.id;
     //request jumlah
     var jumPengurangan = req.body.jumPengurangan;

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
         else if(err)
         {
           res.json({"message":err})
         }
         else
         {
              //query jumlah stock cukup apa ga
              var query1 = "select jumlah,hargaTotal from stock where id = ?";
              var table1 = [id];
              query1 = mysql.format(query1,table1);

              connection.query(query1,function(err,temp)
              {
                  //Jika stok stock cukup
                  if(temp[0].jumlah-jumPengurangan>=0 )
                  {
                      //query pengurangan
                      var query = "UPDATE `stock` SET `hargaTotal`=?,`jumlah`=? WHERE id = ?";
                      var jumStokbaru = temp[0].jumlah - jumPengurangan;
                      var hargaTotalBaru = temp[0].hargaTotalBaru - (temp[0].hargaTotal / temp[0].jumlah);
                      var table = [hargaTotalBaru,jumStokbaru,id];
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
                      res.json({"message":"Stok tidak cukup.. sisa stok "+temp[0].jumlah});
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
          var queryUpdate = "UPDATE `stock` SET `id` = ?, `nama`= ?,`jumlah`=?,`hargaTotal`=? WHERE id = ?";
          var tableUpdate= [idBaru,namaBaru,jumBaru,harBaru,id];
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
}


module.exports = stock;
