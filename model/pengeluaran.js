var mysql   = require("mysql");

function auth(router,connection,md5) {
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

}


module.exports = pengeluaran;
