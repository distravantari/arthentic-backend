var mysql   = require("mysql");

function setting(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
setting.prototype.handleRoutes = function(router,connection,md5)
{
  router.get("/showSetting",function(req,res){
    connection.query("SELECT * FROM `setting`",function(err,rows){
      if (err) {
        res.json({"message":"err.. "+err});
      }else{
        res.json({"message":rows});
      }
    })
  })

  router.post("/insertSetting",function(req,res){
    var tax = req.body.tax;
    var services = req.body.services;
    var pajak = req.body.pajak;

    var query = "INSERT INTO `setting`(`tax`,`services`,`pajakPendapatan`) VALUES (?,?,?)";
    var table = [tax,services,pajak];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"gagal insert setting"});
      }else{
        res.json({"message":"berhasil insert setting"});
      }
    })
  })
  //ubah settingan
  router.post("/updateSetting",function(req,res){
    var tax = req.body.tax;
    var services = req.body.services;
    var pajak = req.body.pajak;

    var query = "UPDATE `setting` SET `tax`= ?,`services`= ?,`pajakPendapatan`=?";
    var table = [tax,services,pajak];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"err.. "+err});
      }else{
        res.json({"message":"success"});
      }
    })
  })

  router.post("/deleteSetting",function(req,res){
    var query = "DELETE FROM `setting`";
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"gagal hapus settting"});
      }else{
        res.json({"message":"berhasil hapus setting"});
      }
    })
  })

  router.post("/getPajakPendapatan",function(req,res)
{
    var query = "select `pajakPendapatan` from `setting`";
    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"gagal mendapatkan pajak pendapatan"});
      }else{
        res.json({"message":rows});
      }
    })
});
}
module.exports = setting;
