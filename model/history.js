var mysql   = require("mysql");

function history(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
history.prototype.handleRoutes = function(router,connection,md5)
{
  //insert history (id, namaUser, perubahan, row)
  router.post("/insertHistory",function(req,res){
    //request nama
    var namaUser = req.body.namaUser;
    //request perubahan
    var perubahan = req.body.perubahan;
    //request row (integer) mau rubah row 1/2/3/4/5/6/7/..../99
    var row = req.body.row;
    //request date (format dd-mm-yyyy, ex. 12-12-2015)
    var status = req.body.status;

    //query insert
    var query = "insert into `history` (nama,perubahan,row,status) VALUES (?,?,?,?)";
    var table = [namaUser,perubahan,row,status];
    query = mysql.format(query, table);

    connection.query(query,function(err,temp){
      if(err)
      {
          res.json({"message":err});
      }
      else
      {

          res.json({"message":"input history berhasil" });
      }
    });
 });
  //--insert history end..

  //show History
  router.post("/showHistory",function(req,res){
     //query show db
     var queryKode = "select * from history";
     queryKode = mysql.format(queryKode);
     connection.query(queryKode,function(err,temp)
     {
         //jika id tidak ada di db
         if(err)
         {
             res.json({"message":"err"});
         }
         else
         {
              res.json({"message":temp});
         }
     });
 });
  //--show history end.
}


module.exports = history;
