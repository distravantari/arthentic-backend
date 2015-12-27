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
    var bulan = req.body.bulan;
    var tahun = req.body.tahun;

    var query = "INSERT INTO `pengeluaran`(`bulan`,`tahun`,`namaPengeluaran`,`jumlah`) VALUES (?,?,?,?)";
    var table = [bulan,tahun,nama,jumlah];
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
    var bulan = req.body.bulan;
    var tahun = req.body.tahun;
    var newbulan = req.body.newbulan;
    var newtahun = req.body.newtahun;
    var query = "UPDATE `pengeluaran` SET `bulan`=?,`tahun`=?,`namaPengeluaran`=?,`jumlah`=? where `bulan`=? AND `tahun`=?";
    var table = [newbulan,newtahun,nama,jumlah,bulan,tahun];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"gagal update data pengeluaran"+query});
      }else{
        res.json({"message":"berhasil update data pengeluaran"});
      }
    })
  })

  router.post("/deletePengeluaran",function(req,res){
    var bulan = req.body.bulan;
    var tahun = req.body.tahun;
    var nama = req.body.nama;
    //var jumlah = req.body.jumlah;

    var query = "DELETE from `pengeluaran` where `bulan`='"+bulan+"' AND `tahun`='"+tahun+"' AND`namaPengeluaran`='"+nama+"'";
    var table = [bulan,nama];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"gagal hapus data pengeluaran"+query});
      }else{
        res.json({"message":"berhasil hapus data pengeluaran"});
      }
    })
  })

  router.post("/showPengeluaran",function(req,res){
    var bulan = req.body.bulan;
    var tahun = req.body.tahun;
      var query = "select * from  `pengeluaran` where `bulan`='"+bulan+"' AND `tahun` = '"+tahun+"'" ;
      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"gagal menampilkan pengeluaran"});
          }else{
              res.json({"message":success});
          }
      });
  });
}
module.exports = pengeluaran;
