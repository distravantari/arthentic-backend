var mysql   = require("mysql");

function history(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
history.prototype.handleRoutes = function(router,connection,md5)
{
  //insert history (id, namaUser, perubahan, row)
  router.post("/insertHistory",function(req,res){
    //request id
    var id = req.body.id;
    //request nama
    var namaUser = req.body.namaUser;
    //request perubahan
    var perubahan = req.body.perubahan;
    //request row (integer) mau rubah row 1/2/3/4/5/6/7/..../99
    var row = req.body.row;
    //request date (format dd-mm-yyyy, ex. 12-12-2015)
    var date = req.body.date;

     //query checking id jika sudah ada yang sama
     var query1 = "select id from history where id = ?";
     var table1 = [id];
     query1 = mysql.format(query1,table1);

     connection.query(query1,function(err,temp)
     {
        //Jika id menu belum ada di database
        if(temp.length == 0 )
        {
            //query insert
            var query = "insert into `history` (id,nama,perubahan,row,date) VALUES (?,?,?,?,?)";
            var table = [id,namaUser,perubahan,row,date];
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
        }
        else if(err)
        {
          res.json({"message":err})
        }
        //Jika barang sudah ada di database
        else
        {
          res.json({"message":"id  "+id+ " sudah ada di database!"});
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
