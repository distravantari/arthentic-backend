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

      var query = "select `date`,`HargaAkhir` from `order` where date between ? and ?";
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

//   router.post("/hitungMingguan",function(req,res){
//       // param tanggal
//       var startdate = req.body.startdate;
//       var enddate = req.body.enddate;
//
//       var totalPendapatan = [];
//       var tanggal = [];
//
//       var query = "select date,hargaAkhir from `order` where date between ? and ?";
//       var table = [startdate,enddate];
//       query = mysql.format(query,table);
//
//       //sukses, kembalikan total harga
//       connection.query(query,function(err,success){
//           if(err){
//               res.json({"message":"error"});
//           }else{
//             if (success.length == 0) {
//               res.json({"message":"you set date incorectly "});
//             }else{
//
//                   for (var i = 0; i < success.length; i++) {
//                     var totalHarga = success[i].hargaAkhir;
//                     for (var j = i+1; j < success.length; j++) {
//                       if(success[i].date.getTime()==success[j].date.getTime()){
//                         totalHarga+=success[j].hargaAkhir;
//                       }
//                   else{
//                     tanggal.push(success[i].date);
//                     totalPendapatan.push(totalHarga);
//                     i=j;
//                     j=success.length;
//                   }
//               }
//             }
//
//           }
//         }
//   });
//
//   var query2 = "insert into `laporanmingguan` (`date`,`TotalPemasukkan`) VALUES ?"
//   var table2 = [[tanggal],[totalPendapatan]];
//
//   //query2 = mysql.format(query2,table2);
//   connection.query(query2,[table2],function(error,rows){
//     if(error){
//       res.json({"message":"gagal insert ke DB mingguan"})
//     }
//     else{
//       res.json({"message":"berhasil insert ke DB mingguan"})
//     }
//
//   })
// });
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
            res.json({"message":success});

        }
    });
});

// //insert mingguan
// router.post("/insertMingguan",function(req,res){
//
//     // param tanggalAwal, tanggalAkhir
//     var tanggalAwal = req.body.tanggalAwal;
//     var tanggalAkhir = req.body.tanggalAkhir;
//     // show order dari tanggal input
//     var result = "";
//     var TotalPemasukkanRes = 0;
//     var query = "select `Date`, `HargaAkhir` from `order` where `Date` between ? and ?  ";
//     var table = [tanggalAwal,tanggalAkhir];
//     query = mysql.format(query,table);
//
//     connection.query(query,function(err,success){
//         if(err)
//         {
//           res.json({"message":"gagal memasukkan ke DB mingguan " +query})
//         }
//         else
//         {
//             for (var i = 0; i < success.lengt; i++) {
//               var dateA = success[i].Date;
//               var hargaA = success[i].HargaAkhir;
//               var query2 = "select * from `laporanmingguan` where date = ?";
//               var table2 = [dateA];
//               query2 = mysql.format(query2,table2);
//               connection.query(query2,function(err2,temp){
//                   if(err2)
//                   {
//                     res.json({"message":"gagal"})
//                   }
//                   else
//                   {
//
//                     if (temp.length==0)
//                     {
//                       var query3 = "insert into  `laporanmingguan` (`date`,`TotalPemasukkan`) values(?,?) ";
//                       var table3 = [dateA,hargaA];
//                       query3 = mysql.format(query3,table3);
//                       connection.query(query3,function(err3,temp2){
//                           if(err3)
//                           {
//                             res.json({"message":"gagal insert1 "+query3})
//                           }
//                           else
//                           {
//                             // result = "sukses insert"
//                             res.json({"message":"f insert1 "+query3})
//                           }
//                       });
//                     }
//                     else
//                     {
//                       TotalPemasukkanRes = temp[0].TotalPemasukkan;
//                       var Total = TotalPemasukkanRes - (-hargaA);
//                       var query4 = "update  `laporanmingguan` set `TotalPemasukkan` = ? where date = ?";
//                       var table4 = [Total,dateA];
//                       query4 = mysql.format(query4,table4);
//                       connection.query(query4,function(err4,temp3){
//                           if(err4)
//                           {
//                             res.json({"message":" failed "+hargaA})
//                           }
//                           else
//                           {
//                             result = "sukses update";
//                             res.json({"message":query4})
//                           }
//                       });
//                     }
//                   }
//                   });
//                 }
//                 //  res.json({"message":result})
//               }
//         });
// });
// // end insert MINGGUAN

  // router.post("/insertDBMingguan",function(req,res){
  //     var startdate = req.body.startdate;
  //     var enddate = req.body.enddate;
  //     var totalHarga = req.body.totalHarga;
  //
  //     //query untuk insert ke database Laporan Keuangan Harian
  //     var query2 = "insert into `laporanmingguan` (StartDate,EndDate,TotalPemasukkan) VALUES (?,?,?)";
  //     var table2 = [startdate,enddate,totalHarga];
  //     query2 = mysql.format(query2,table2)
  //
  //     connection.query(query2,function(err,success){
  //       if(err){
  //         res.json({"message":"err .."+query2});
  //       }
  //       else{
  //         res.json({"message":"success"});
  //
  //       }
  //
  //     });
  // });
  //
  // router.post("/hitungBulanan",function(req,res){
  //     // param tanggal
  //     var bulan = req.body.bulan;
  //     var tahun = req.body.tahun;
  //     //var nomerorder=req.body.nomerorder;
  //     var totalHarga=Number(0);
  //     // pilih harga berdasarkan tanggal
  //     var query = "select * from `order` where EXTRACT(MONTH from date)=? AND EXTRACT(YEAR from date)=?";
  //     var table = [bulan,tahun];
  //     query = mysql.format(query,table);
  //
  //     //sukses, kembalikan total harga
  //     connection.query(query,function(err,success){
  //         if(err){
  //             res.json({"message":"tidak dapat menghitung total harian"+query})
  //         }else{
  //           //   var pesanan = "";
  //           //   var quantity = "";
  //           //   var diskon= "";
  //           //   var hargaAkhir = "";
  //           //   for(i=0;i<success.length;i++){
  //           //       pesanan+= success[i].pesanan+",";
  //           //       quantity+= success[i].quantity+",";
  //           //       diskon+= success[i].diskon+",";
  //           //       hargaAkhir+= success[i].hargaAkhir+",";
  //           //       totalHarga = Number(totalHarga)+Number(success[i].hargaAkhir);
  //           //  }
  //             res.json({"message":success});
  //
  //         }
  //     });
  // });

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
