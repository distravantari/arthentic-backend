var mysql   = require("mysql");

function invoice(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
invoice.prototype.handleRoutes = function(router,connection,md5)
{
  router.post("/insertInvoice",function(req,res){

    var name = req.body.name;
    var kuantitas = req.body.kuantitas;
    var satuan = req.body.satuan;

    var query = "INSERT INTO `invoce`(`name`, `kuantitas`, `totalSatuan`) VALUES (?,?,?)";
    var table = [name,kuantitas,satuan];
    query = mysql.format(query,table);

    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"err..."+query});
      }else{
        res.json({"message":"successfully added to invoice"});
      }
    })
  })
}


module.exports = invoice;
