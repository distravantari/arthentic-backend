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
    var diskon = req.body.diskon;

    var query = "INSERT INTO `invoce`(`name`, `kuantitas`, `totalSatuan`, `discount`) VALUES (?,?,?,?)";
    var table = [name,kuantitas,satuan,diskon];
    query = mysql.format(query,table);

    connection.query(query,function(err,rows){
      if (err) {
        res.json({"message":"err..."+query});
      }else{
        res.json({"message":"successfully added to invoice"});
      }
    })
  });

  router.get("/invoices",function(req,res){
    connection.query("SELECT * FROM `invoce`",function(err,rows){
      if (err) {
        res.json({"message":"err..."});
      }else{
        res.json({"message":rows});
      }
    })
  });
}


module.exports = invoice;
