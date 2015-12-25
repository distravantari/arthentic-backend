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





  //bulanan

  router.post("/insertDBBulanan",function(req,res){

      var bulan = req.body.bulan;
      var tahun = req.body.tahun;
      var totalpendapatanBulanan=Number(0);
      var persediaanawal=0;
      var pembelian=req.body.pembelian;
      var labakotor = 0;
      var lababersih=0;
      var biayabunga = req.body.biayabunga;
      var labasebelumpajak=0;
      var biayapajak=req.body.biayapajak;
      var totalbiayaoperasi=req.body.totalbiayaoperasi;
      var query = "select TotalPemasukkan from `laporanharian` where EXTRACT(MONTH from date)=? AND EXTRACT(YEAR from date)=?";
      var table = [bulan,tahun];
      query = mysql.format(query,table);

      //sukses, kembalikan total harga
      connection.query(query,function(err,success){
          if(err){
              res.json({"message":"tidak dapat menghitung total pendapatan bulanan"+query})
          }else{
              for(i=0;i<success.length;i++){
                  totalpendapatanBulanan = Number(totalpendapatanBulanan)+Number(success[i].TotalPemasukkan);
             }
          //query untuk insert ke database Laporan Keuangan Harian
          var query2 = "insert into `laporanbulanan` (bulan,tahun,totalpendapatan) VALUES (?,?,?)";
          var table2 = [bulan,tahun,totalpendapatanBulanan,];
          query2 = mysql.format(query2,table2)

          connection.query(query2,function(err,success){
            if(err){
              res.json({"message":"gagal memasukkan ke database harian"+query2});
            }
            else{
              res.json({"message":"berhasil memasukkan ke database harian"+query2});

            }

          });
          }
      });
  });
}


module.exports = report;
