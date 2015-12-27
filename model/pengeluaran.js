var mysql   = require("mysql");

function pengeluaran(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
pengeluaran.prototype.handleRoutes = function(router,connection,md5)
{
  router.get("/setting",function(req,res){
    connection.query("SELECT * FROM `setting`",function(err,rows){
      if (err) {
        res.json({"message":"err.. "+err});
      }else{
        res.json({"message":rows});
      }
    })
  })

  //ubah settingan
  router.post("/setting",function(req,res){
    var tax = req.body.tax;
    var services = req.body.services;

    var query = "UPDATE `setting` SET `tax`= ?,`services`= ?";
    var table = [tax,services];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"err.. "+err});
      }else{
        res.json({"message":"success"});
      }
    })
  })
// untuk data-data biaya operasional
  router.post("/insertPengeluaran",function(req,res){
    var nama = req.body.nama;
    var jumlah = req.body.jumlah;

    var query = "INSERT INTO `pengeluaran`(`namaPengeluaran`, `jumlah`) VALUES (?,?)";
    var table = [nama,jumlah];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"gagal input data pengeluaran"});
      }else{
        res.json({"message":"berhasil input data pengeluaran"});
      }
    })
  })

  router.post("/updatePengeluaran",function(req,res){
    var nama = req.body.nama;
    var jumlah = req.body.jumlah;

    var query = "INSERT INTO `pengeluaran`(`namaPengeluaran`, `jumlah`) VALUES (?,?)";
    var table = [nama,jumlah];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"gagal input data pengeluaran"});
      }else{
        res.json({"message":"berhasil input data pengeluaran"});
      }
    })
  })

  router.post("/insertPengeluaran",function(req,res){
    var nama = req.body.nama;
    var jumlah = req.body.jumlah;

    var query = "INSERT INTO `pengeluaran`(`namaPengeluaran`, `jumlah`) VALUES (?,?)";
    var table = [nama,jumlah];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"gagal input data pengeluaran"});
      }else{
        res.json({"message":"berhasil input data pengeluaran"});
      }
    })
  })

  router.post("/showPengeluaran",function(req,res){

      // param tanggal
      var query = "select * from  `pengeluaran`";
      //var table = [startdate,enddate];
      //query = mysql.format(query,table);

      //sukses, kembalikan total harga
      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"gagal menampilkan pengeluaran"});
          }else{
              res.json({"message":"berhasil menampilkan pengeluaran"});
          }
      });
  });

router.post("/insertTotalBiayaOp",function(req,res)
{
  var query = "select `jumlah` from `pengeluaran` where "

});
}


module.exports = pengeluaran;
