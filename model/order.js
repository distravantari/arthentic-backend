var mysql   = require("mysql");

function order(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
order.prototype.handleRoutes = function(router,connection,md5)
{
  router.post("/insertOrder",function(req,res){
      // param
      var nomerorder = req.body.nomerorder;
      var id = req.body.id;
      var date = req.body.date;
      var pesanan = req.body.pesanan;
      var quantity = req.body.quantity;
      var diskon = req.body.diskon;
      var hargasatuan = req.body.hargasatuan;
      var hargaTotal = req.body.hargaTotal;
        var test = "SELECT * from `menu` where nama = '"+pesanan+"'"
        connection.query(test,function(err,rows){
          //sukses, kembalikan total harga
          //query insert
          if (err) {
            res.json({"message":test});
          }else{
            // res.json({"message":rows[0].hargaProduksi});
            var query = "insert into `order` (nomerorder,id,date,pesanan,quantity,diskon,hargasatuan,hargaProduksi,hargaakhir) VALUES (?,?,?,?,?,?,?,?,?)";
            var table = [nomerorder,id,date,pesanan,quantity,diskon,hargasatuan,(rows[0].hargaProduksi*quantity),((hargasatuan*quantity)-(hargasatuan*quantity*(diskon/100))-(rows[0].hargaProduksi*quantity))];
            query = mysql.format(query,table);
            connection.query(query,function(err,success){
                if(err){
                    res.json({"message":query});
            //         // alert(query);
                }
                else{
                    res.json({"message":"Berhasil input order" + query + hargaTotal});
                }
            });
          }

        })
      });

  router.post("/deleteOrder",function(req,res){

      // param tanggal
      var nomerorder = req.body.nomerorder;
      var id = req.body.id;
      // pilih harga berdasarkan tanggal
      var query = "DELETE FROM `order` WHERE nomerorder=? AND id=?";
      var table = [nomerorder,id];
      query = mysql.format(query,table);

      //sukses, kembalikan total harga
      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"gagal menghapus"})
          }else{
             res.json({"message":"berhasil menghapus"});
          }
      });
  });

  router.post("/getIdOrder",function(req,res){
    connection.query("SELECT * FROM `order` ORDER BY nomerOrder DESC LIMIT 1",function(err,rows){
      if (err) {
        res.json({"message":"err.."+err});
      }else{
        res.json({"message":rows});
      }
    })
  })

  router.post("/showOrder",function(req,res){

      var query = "select * from `order`";
      //sukses, kembalikan total harga
      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"gagal menampilkan"+query})
          }else{
              for(i=0;i<success.length;i++){
                  res.json({"message":success});
              }
          }
      });
  });

  router.post("/updateOrder",function(req,res){
      var nomerorder = req.body.nomerorder;
      var id = req.body.id;
      //var date = req.body.date;
      var pesanan = req.body.pesanan;
      var quantity = req.body.quantity;
      var diskon = req.body.diskon;
      var hargasatuan = req.body.hargasatuan;
      var hargaDiskon = hargasatuan-(diskon/100*hargasatuan);
      var hargaTotal = hargaDiskon*quantity;


      var query = "UPDATE `order` SET `Pesanan`=?,`Quantity`=?,`Diskon`=?,`HargaSatuan`=?,`HargaAkhir`=? WHERE nomerorder=? AND id=?";
      var table = [pesanan,quantity,diskon,hargasatuan,hargaTotal,nomerorder,id];
      query = mysql.format(query,table);
      //sukses, kembalikan total harga
      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"gagal update"+query})
          }else{
              res.json({"message":"berhasil update"+query});
          }
      });
  });
}


module.exports = order;
