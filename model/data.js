var mysql   = require("mysql");

function data(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
data.prototype.handleRoutes = function(router,connection,md5)
{
  router.post("/insertPegawai",function(req,res){
      //request nik
      var nik = req.body.nik;
      //request nama
      var nama = req.body.nama;
      //request alamat
      var alamat = req.body.alamat;
      //request
      var jabatan = req.body.jabatan;
      //request date (format yyyy-mm-dd, ex.2015-12-12)
      var tanggallahir = req.body.tanggallahir;
      //request gaji pegawai
      var gaji = req.body.gaji;

      //query checking id jika sudah ada yang sama
      var query1 = "select NIK from pegawai where NIK = ?";
      var table1 = [nik];
      query1 = mysql.format(query1,table1);

      connection.query(query1,function(err,temp)
      {
        if(err){
          res.json({"message":err});
        }
        else{
        //Jika id menu belum ada di database
        if(temp.length == 0 )
        {
            //query insert
            var query = "INSERT INTO `pegawai`(`NIK`, `Nama`, `Alamat`, `Jabatan`, `TanggalLahir`, `Gaji`) VALUES (?,?,?,?,?,?)"
            var table = [nik,nama,alamat,jabatan,tanggallahir,gaji];
            query = mysql.format(query, table);

            connection.query(query,function(err,temp){
              if(err)
              {
                  res.json({"message":"failed "+query});
              }
              else
              {

                  res.json({"message":"input pegawai berhasil" });
              }
            });
        }
        //Jika barang sudah ada di database
        else
        {
          res.json({"message":"id  "+nik+ " sudah ada di database!"});
        }
      }
      });
  });
  //--insert pegawai end..

  //update pegawai(id, nama,alamat,jabatan,tanggal_lahir,gaji)
  router.post("/updatePegawai",function(req,res){
  //request nik
  var nik = req.body.nik;
  //request nama
  var nama = req.body.nama;
  //request alamat
  var alamat = req.body.alamat;
  //request
  var jabatan = req.body.jabatan;
  //request date (format yyyy-mm-dd, ex.2015-12-12)
  var tanggallahir = req.body.tanggallahir;
  //request gaji pegawai
  var gaji = req.body.gaji;
  //query checking id jika sudah ada yang sama
  var query = "UPDATE `pegawai` SET `nama`=?,`alamat`=?,`jabatan`=?,`tanggallahir`=?,`gaji`=? WHERE `nik`=?";
  var table = [nama,alamat,jabatan,tanggallahir,gaji,nik];
  query = mysql.format(query, table);

  connection.query(query,function(err,temp){
  if(err)
  {
  res.json({"message":"failed update"+query});
  }
  else
  {
  res.json({"message":"Berhasil Update"});
  }
  });
  });
  //--update pegawai end..

  router.post("/deletePegawai",function(req,res){
  //request nik
  var nik = req.body.nik;
  //query checking id jika sudah ada yang sama
  var query = "DELETE from `pegawai` WHERE nik=?";
  var table = [nik];
  query = mysql.format(query, table);

  connection.query(query,function(err,temp){
  if(err)
  {
  res.json({"message":"failed hapus"+query});
  }
  else
  {
  res.json({"message":"Berhasil Hapus"});
  }
  });
  });
  //--update pegawai end..

  //show Pegawai
  router.post("/showPegawai",function(req,res){
    //query show db
    var queryKode = "select* from `pegawai`";
    queryKode = mysql.format(queryKode);
    connection.query(queryKode,function(err,temp)
      {
          //jika id tidak ada di db
          if(err)
      {
          res.json({"message":"error "+ queryKode});
      }
      else
      {
          res.json({"message":temp});
      }
    });
  });

  //insert supplier (id, namaUser, perubahan, row)
  router.post("/insertSupplier",function(req,res){
  //request nik
  var nis = req.body.nis;
  //request nama
  var nama = req.body.nama;
  //request alamat
  var alamat = req.body.alamat;
  //request
  var nomertelepon = req.body.nomertelepon;

  //query checking id jika sudah ada yang sama
  var query1 = "select nis from `supplier` where nis = ?";
  var table1 = [nis];
  query1 = mysql.format(query1,table1);

  connection.query(query1,function(err,temp)
  {
  if(err){
  res.json({"message":err});
  }
  else{
  //Jika id menu belum ada di database
  if(temp.length == 0 )
  {
  //query insert
  var query = "INSERT INTO `supplier`(`nis`, `nama`, `alamat`, `nomertelepon`) VALUES (?,?,?,?)"
  var table = [nis,nama,alamat,nomertelepon];
  query = mysql.format(query, table);

  connection.query(query,function(err,temp){
  if(err)
  {
    res.json({"message":"input supplier gagal"+query});
  }
  else
  {

    res.json({"message":"input supplier berhasil" });
  }
  });
  }
  //Jika barang sudah ada di database
  else
  {
  res.json({"message":"id  "+nis+ " sudah ada di database!"});
  }
  }
  });
  });
  //--insert pegawai end..

  //update pegawai(id, nama,alamat,jabatan,tanggal_lahir,gaji)
  router.post("/updateSupplier",function(req,res){
  //request nik
  var nis = req.body.nis;
  //request nama
  var nama = req.body.nama;
  //request alamat
  var alamat = req.body.alamat;
  //request
  var nomertelepon = req.body.nomertelepon;
  //query checking id jika sudah ada yang sama
  var query = "UPDATE `supplier` SET `nama`=?,`alamat`=?,`nomertelepon`=? WHERE `nis`=?";
  var table = [nama,alamat,nomertelepon,nis];
  query = mysql.format(query, table);

  connection.query(query,function(err,temp){
  if(err)
  {
  res.json({"message":"failed"+query});
  }
  else
  {
  res.json({"message":"Berhasil Update Supplier"});
  }
  });
  });
  //--update pegawai end..

  router.post("/deleteSupplier",function(req,res){
  //request nik
  var nis = req.body.nis;
  //query checking id jika sudah ada yang sama
  var query = "DELETE from `supplier` WHERE nis=?";
  var table = [nis];
  query = mysql.format(query, table);

  connection.query(query,function(err,temp){
  if(err)
  {
  res.json({"message":"gagal hapus supplier "});
  }
  else
  {
  res.json({"message":"Berhasil Hapus Supplier"});
  }
  });
  });
  //--update pegawai end..

  //show Pegawai
  router.post("/showSupplier",function(req,res){
  //query show db
  var queryKode = "select* from `supplier`";
  queryKode = mysql.format(queryKode);
  connection.query(queryKode,function(err,temp)
  {
  //jika id tidak ada di db
  if(err)
  {
   res.json({"message":"error "+ queryKode});
  }
  else
  {
    res.json({"message":temp});
  }
  });
  });

  //insert supplier (id, namaUser, perubahan, row)
  router.post("/insertCustomer",function(req,res){
  //request nik
  var kodemember = req.body.kodemember;
  //request nama
  var nama = req.body.nama;
  //request alamat
  var alamat = req.body.alamat;
  //request
  var tanggallahir = req.body.tanggallahir;
  var startmember = req.body.startmember;
  var endmember = req.body.endmember;

  //query checking id jika sudah ada yang sama
  var query1 = "select kodemember from `customer` where kodemember = ?";
  var table1 = [kodemember];
  query1 = mysql.format(query1,table1);

  connection.query(query1,function(err,temp)
  {
  if(err){
  res.json({"message":err});
  }
  else{
  //Jika id menu belum ada di database
  if(temp.length == 0 )
  {
  //query insert
  var query = "INSERT INTO `customer`(`kodemember`, `nama`, `alamat`, `tanggallahir`, `startmember`, `endmember`) VALUES (?,?,?,?,?,?)"
  var table = [kodemember,nama,alamat,tanggallahir,startmember,endmember];
  query = mysql.format(query, table);

  connection.query(query,function(err,temp){
  if(err)
  {
    res.json({"message":"failed "+query});
  }
  else
  {

    res.json({"message":"input customer berhasil" });
  }
  });
  }
  //Jika barang sudah ada di database
  else
  {
  res.json({"message":"id  "+kodemember+ " sudah ada di database!"});
  }
  }
  });
  });
  //--insert pegawai end..

  //update pegawai(id, nama,alamat,jabatan,tanggal_lahir,gaji)
  router.post("/updateCustomer",function(req,res){
  //request nik
  var kodemember = req.body.kodemember;
  //request nama
  var nama = req.body.nama;
  //request alamat
  var alamat = req.body.alamat;
  //request
  var tanggallahir = req.body.tanggallahir;
  var startmember = req.body.startmember;
  var endmember = req.body.endmember;
  //query checking id jika sudah ada yang sama
  var query = "UPDATE `customer` SET `nama`=?,`alamat`=?,`tanggallahir`=?, `startmember`=?, `endmember`=? WHERE `kodemember`=?";
  var table = [nama,alamat,tanggallahir,startmember,endmember,kodemember];
  query = mysql.format(query, table);

  connection.query(query,function(err,temp){
  if(err)
  {
  res.json({"message":"failed "+query});
  }
  else
  {
  res.json({"message":"Berhasil Update Customer"});
  }
  });
  });
  //--update pegawai end..

  router.post("/deleteCustomer",function(req,res){
  //request nik
  var kodemember = req.body.kodemember;
  //query checking id jika sudah ada yang sama
  var query = "DELETE from `customer` WHERE kodemember=?";
  var table = [kodemember];
  query = mysql.format(query, table);

  connection.query(query,function(err,temp){
  if(err)
  {
  res.json({"message":"failed "+query});
  }
  else
  {
  res.json({"message":"Berhasil Hapus Customer"});
  }
  });
  });
  //--update pegawai end..

  //show Pegawai
  router.post("/showCustomer",function(req,res){
  //query show db
  var queryKode = "select * from `customer`";
  queryKode = mysql.format(queryKode);
  connection.query(queryKode,function(err,temp)
  {
  //jika id tidak ada di db
  if(err)
  {
   res.json({"message":"error "+ queryKode});
  }
  else
  {
    res.json({"message":temp});
  }
  });
  });

}


module.exports = data;
