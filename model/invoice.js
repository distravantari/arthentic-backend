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
    var hargaSatuan = req.body.hargaSatuan;

    var query = "INSERT INTO `invoice`(`name`, `hargaSatuan` ,`kuantitas`, `totalSatuan`, `discount`) VALUES (?,?,?,?,?)";
    var table = [name,hargaSatuan,kuantitas,satuan,diskon];
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
    connection.query("SELECT * FROM `invoice`",function(err,rows){
      if (err) {
        res.json({"message":"err..."});
      }else{
        res.json({"message":rows});
      }
    })
  });

  router.get("/deleteInvoices",function(req,res){
    connection.query("DELETE FROM `invoice`",function(err,rows){
      if (err) {
        res.json({"message":"gagal hapus invoice"});
      }else{
        res.json({"message":"berhasil hapus invoice"});
      }
    })
  });
}


module.exports = invoice;
