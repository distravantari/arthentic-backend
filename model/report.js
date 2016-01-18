var mysql   = require("mysql");

function report(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
report.prototype.handleRoutes = function(router,connection,md5)
{
  // HARIAN
  router.post("/hitungHarian",function(req,res){
      // param tanggal
      var date = req.body.date;
      //var nomerorder=req.body.nomerorder;
      var totalHarga=Number(0);
      // pilih harga berdasarkan tanggal
      var query = "select * from `order` where date = ?";
      var table = [date];
      query = mysql.format(query,table);


      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"err.."+query});
          }else{
              res.json({"message":success});

          }
      });
  });

  router.post("/insertDBHarian",function(req,res){
      var date = req.body.date;
      var totalHarga = req.body.totalHarga;

      //query untuk insert ke database Laporan Keuangan Harian
      var query2 = "insert into `laporanharian` (date,TotalPemasukkan) VALUES (?,?)";
      var table2 = [date,totalHarga];
      query2 = mysql.format(query2,table2)

      connection.query(query2,function(err,success){
        if(err){
          res.json({"message":"err .."+query2});
        }
        else{
          res.json({"message":"success"});

        }

      });
  });

// MINGGUAN
  router.post("/hitungMingguan",function(req,res){
      // param tanggal
      var startdate = req.body.startdate;
      var enddate = req.body.enddate;

      var query = "select * from `order` where date between ? and ?";
      var table = [startdate,enddate];
      query = mysql.format(query,table);

      //sukses, kembalikan total harga
      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"err.."+query});
          }else{
            if (success.length == 0) {
              res.json({"message":"you set date incorectly "+query});
            }else{
              res.json({"message":success});
            }
          }
      });
  });

  router.post("/insertDBMingguan",function(req,res){
      var startdate = req.body.startdate;
      var enddate = req.body.enddate;
      var totalHarga = req.body.totalHarga;

      //query untuk insert ke database Laporan Keuangan Harian
      var query2 = "insert into `laporanmingguan` (StartDate,EndDate,TotalPemasukkan) VALUES (?,?,?)";
      var table2 = [startdate,enddate,totalHarga];
      query2 = mysql.format(query2,table2)

      connection.query(query2,function(err,success){
        if(err){
          res.json({"message":"err .."+query2});
        }
        else{
          res.json({"message":"success"});

        }

      });
  });

  router.post("/hitungBulanan",function(req,res){
      // param tanggal
      var bulan = req.body.bulan;
      var tahun = req.body.tahun;
      //var nomerorder=req.body.nomerorder;
      var totalHarga=Number(0);
      // pilih harga berdasarkan tanggal
      var query = "select * from `order` where EXTRACT(MONTH from date)=? AND EXTRACT(YEAR from date)=?";
      var table = [bulan,tahun];
      query = mysql.format(query,table);

      //sukses, kembalikan total harga
      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"tidak dapat menghitung total harian"+query})
          }else{
            //   var pesanan = "";
            //   var quantity = "";
            //   var diskon= "";
            //   var hargaAkhir = "";
            //   for(i=0;i<success.length;i++){
            //       pesanan+= success[i].pesanan+",";
            //       quantity+= success[i].quantity+",";
            //       diskon+= success[i].diskon+",";
            //       hargaAkhir+= success[i].hargaAkhir+",";
            //       totalHarga = Number(totalHarga)+Number(success[i].hargaAkhir);
            //  }
              res.json({"message":success});

          }
      });
  });

  router.post("/insertDBBulanan",function(req,res){

      // param tanggal
      var bulan = req.body.bulan;
      var tahun = req.body.tahun;
      //var nomerorder=req.body.nomerorder;
      var totalPengeluaran= req.body.totalPengeluaran;
      var totalPendapatan= req.body.totalPendapatan;
      var rincian = req.body.rincian;
      var laba = req.body.laba;
      // pilih harga berdasarkan tanggal
      var query = "INSERT INTO `laporanbulanan` (bulan,tahun,totalpendapatan,rincian,totalbiayaoperasional,laba) VALUES (?,?,?,?,?,?)";
      var table = [bulan,tahun,totalPendapatan,totalPengeluaran,laba];
      query = mysql.format(query,table);

      //sukses, kembalikan total harga
      connection.query(query,function(err,success){
          if(err){
            res.json({"message":"gagal memasukkan ke DB bulanan"})
          }else{
            res.json({"message":"berhasil memasukkan ke DB bulanan"});
          }
      });
  });

}
module.exports = report;
