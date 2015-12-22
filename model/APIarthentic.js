var mysql   = require("mysql");

function APIarthentic(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
APIarthentic.prototype.handleRoutes = function(router,connection,md5)
{
    var self = this;

    //registrasi
    router.post("/registrasi",function(req,res){
       //request nama
       var nama = req.body.nama;
       //request role
       var role = req.body.role;
       //request password
       var password = req.body.password;
      //request permission (berisi angka 11111,)
      var permission = req.body.permission;

       //query checking username jika sama
       var query1 = "select nama from user where nama = ?";
       var table1 = [nama];
       query1 = mysql.format(query1,table1);

       connection.query(query1,function(err,temp)
       {
         if(err){
           res.json({"message":err});
         }
         else{
          //Jika nama belum ada di database
          if(temp.length == 0 )
          {
              //query insert
              var query = "INSERT INTO `user` (nama,password,role,permission) VALUES (?,?,?,?)";
              var table = [nama,md5(password),role,permission];
              query = mysql.format(query, table);

              connection.query(query,function(err,temp){
                if(err)
                {
                    res.json({"message":err});
                }
                else
                {

                    res.json({"message":"Registrasi berhasil atas nama "+nama});
                }
              });
          }
          //Jika nama sudah ada di database
          else
          {
            res.json({"message":"Registrasi gagal! "+"Nama "+nama+ " sudah ada di database!"});
          }
        }
       });
   });
    //--registrasi end...

    //login
    router.post("/login",function(req,res)
    {
        //request nama
        var nama = req.body.nama;
        //request password
        var password = req.body.password;

        //query cek username dan password di db
        var queryLogin = "select nama from user where nama = ? and password = ?";
        var tableLogin = [nama,md5(password)];
        queryLogin = mysql.format(queryLogin,tableLogin);

        connection.query(queryLogin,function(err,temp)
        {
            //jika nama dan password cocok sama DB
            if(temp.length != 1)
            {
                res.json("Nama atau password salah");
            }
            else if(err)
            {
              res.json({"message":err})
            }
            //jika nama atau password tidak cocok sama DB
            else
            {
                res.json("Login berhasil. Selamat datang "+nama )
            }
        });
    });
    //--login end...

    //update nama
   router.post("/updateUser",function(req,res)
   {
       //request id
       var id = req.body.id;
       //request id baru
       var idBaru = req.body.idBaru;
       //request nama baru
       var namaBaru = req.body.namaBaru;
       //request pass baru
       var passBaru = req.body.passBaru;
       //request role baru
       var roleBaru = req.body.roleBaru;
       //request permission baru
       var permissionBaru = req.body.permissionBaru;

       //query cek username dan password di db
       var queryLogin2 = "select id from user where id = ?";
       var tableLogin2 = [id];
       queryLogin2 = mysql.format(queryLogin2,tableLogin2);

       connection.query(queryLogin2,function(err,temp)
       {
           //jika nama tidak cocok sama DB
           if(temp.length != 1)
           {
               res.json({"message":"id tidak ada di database"});
           }
           else if(err)
           {
             res.json({"message":err})
           }
           //jika nama cocok sama DB
           else
           {
               //query cek username dan password di db
               var queryUpdate = "UPDATE `user` SET `id`=?,`nama`= ?,`password`=?,`role`=?,`permission`=? WHERE id = ?";
               var tableUpdate= [idBaru,namaBaru,md5(passBaru),roleBaru,permissionBaru,id];
               queryUpdate = mysql.format(queryUpdate,tableUpdate);

               connection.query(queryUpdate,function(err,temp)
               {
                   //jika query update tidak berhasil
                   if(err)
                   {
                       res.json({"message":queryUpdate});
                   }
                   //jika query update berhasil
                   else
                   {
                       res.json({"message":"Berhasil diUpdate"});
                   }
               });
           }
       });
   });
   //--update user selesai...

    //delete user
    router.post("/deleteUser",function(req,res)
    {
        //request nama yang di delete
        var nama_delete = req.body.nama_delete;

        //query cek username
        var queryDelete = "delete from user where nama = ?";
        var tableDelete = [nama_delete];
        queryLogin = mysql.format(queryDelete,tableDelete);

        connection.query(queryDelete,function(err,temp)
        {
            //jika delete gagal
            if(err)
            {
                res.json({"message":"error!"});
            }
            //jika delete berhasil
            else
            {
                res.json({"message":"Delete user dengan nama : "+name_delete+" berhasil"});
            }
        });
    });
    //--delete user end...


//cekPermission
router.post("/cekPermission",function(req,res){
   //request nama
   var nama = req.body.nama

   //query checking username jika sama
   var query1 = "select nama from user where nama = ?";
   var table1 = [nama];
   query1 = mysql.format(query1,table1);

   connection.query(query1,function(err,temp)
   {
     if(err){
       res.json({"message":err});
     }
     else{
      //Jika nama  ada di database
      if(temp.length == 1 )
      {
          //query insert
          var query = "select permission from user where nama = ?";
          var table = [nama];
          query = mysql.format(query, table);

          connection.query(query,function(err,temp){
            if(err)
            {
                res.json({"message":"Shit! "+query});
            }
            else
            {
                var tampung = temp[0].permission;
                var result = "";
                if(tampung.charAt(0)==1)
                {
                  result+="menu;";
                }
                if(tampung.charAt(1)==1)
                {
                  result+="stok;";
                }
                if(tampung.charAt(2)==1)
                {
                  result+="order;";
                }
                if(tampung.charAt(3)==1)
                {
                  result+="laporanKeuangan;";
                }
                res.json(result);
            }

          });
        }
        //Jika nama tidak ada di db
        else
        {
          res.json({"message":"cek permission gagal.. tidak ada nama di database"});
        }
      }
      });
    });
//--cek permission end...
//insert stock param(id, nama, jumlah, harga total) harga total sesuai kuantitas
    router.post("/insertBarang",function(req,res){
       //request id
       var id = req.body.id;
       //request nama
       var nama = req.body.nama;
       //request jumlah
       var jumlah = req.body.jumlah;
       //request hargaTotal
       var hargaTotal = req.body.hargaTotal;


       //query checking id jika sama
       var query1 = "select id from stock where id = ?";
       var table1 = [id];
       query1 = mysql.format(query1,table1);

       connection.query(query1,function(err,temp)
       {
          //Jika id stock belum ada di database
          if(temp.length == 0 )
          {
              //query insert
              var query = "INSERT INTO `stock` (id,nama,jumlah,hargaTotal) VALUES (?,?,?,?)";
              var table = [id,nama,jumlah,hargaTotal];
              query = mysql.format(query, table);

              connection.query(query,function(err,temp){
                if(err)
                {
                    res.json({"message":err});
                }
                else
                {

                    res.json({"message":"input stock berhasil dengan id "+id});
                }
              });
          }
          else if(err)
          {
            res.json({"message":err})
          }
          //Jika id stock sudah ada di database
          else
          {
            res.json({"message":"id "+id+ " sudah ada di database!"});
          }
       });
   });
    //--input stock end..

    // kurangin stok param(id,jumPengurangan)
    router.post("/kurangStok",function(req,res){
       //request nama
       var id = req.body.id;
       //request jumlah
       var jumPengurangan = req.body.jumPengurangan;

       //query cek id di db
       var queryKode = "select id from stock where id = ?" ;
       var tableKode = [id];
       queryKode = mysql.format(queryKode,tableKode);
       connection.query(queryKode,function(err,temp)
       {
           //jika id tidak ada di db
           if(temp.length==0)
           {
               res.json({"message":"Kode input tidak ada di db "});
           }
           else if(err)
           {
             res.json({"message":err})
           }
           else
           {
                //query jumlah stock cukup apa ga
                var query1 = "select jumlah,hargaTotal from stock where id = ?";
                var table1 = [id];
                query1 = mysql.format(query1,table1);

                connection.query(query1,function(err,temp)
                {
                    //Jika stok stock cukup
                    if(temp[0].jumlah-jumPengurangan>=0 )
                    {
                        //query pengurangan
                        var query = "UPDATE `stock` SET `hargaTotal`=?,`jumlah`=? WHERE id = ?";
                        var jumStokbaru = temp[0].jumlah - jumPengurangan;
                        var hargaTotalBaru = temp[0].hargaTotalBaru - (temp[0].hargaTotal / temp[0].jumlah);
                        var table = [hargaTotalBaru,jumStokbaru,id];
                        query = mysql.format(query, table);

                        connection.query(query,function(err,temp){
                        if(err)
                        {
                            res.json({"message":err});
                        }
                        else
                        {

                            res.json({"message":"pengurangan stok berhasil.. sisa stok "+jumStokbaru});
                        }
                        });

                    }
                    //Jika stok stock tidak cukup
                    else
                    {
                        res.json({"message":"Stok tidak cukup.. sisa stok "+temp[0].jumlah});
                    }
                });
           }

       });

   });
    //--kurangin stock end..

    // tambah stok param(id,jumPenambahan,harga)
    router.post("/tambahStok",function(req,res){
       //request nama
       var id = req.body.id;
       //request jumlah
       var jumPenambahan = req.body.jumPenambahan;
       //request harga
       var harga = req.body.harga;

       //query cek id di db
       var queryKode = "select id from stock where id = ?" ;
       var tableKode = [id];
       queryKode = mysql.format(queryKode,tableKode);
       connection.query(queryKode,function(err,temp)
       {
           //jika id tidak ada di db
           if(temp.length==0)
           {
               res.json({"message":"Kode input tidak ada di db "});
           }
           else
           {
                //query jumlah stock cukup apa ga
                var query1 = "select jumlah,hargaTotal from stock where id = ?";
                var table1 = [id];
                query1 = mysql.format(query1,table1);

                connection.query(query1,function(err,temp)
                {
                    var jumStokbaru = temp[0].jumlah - (-jumPenambahan);
                    var jumHargaBaru = temp[0].hargaTotal - (-harga);
                    //Jika penambahan melebihi kuota
                    if(jumStokbaru >= 255)
                    {
                        res.json({"message":"Penambahan melebihi kuota stok.. stok "+temp[0].jumlah});
                    }
                    else if(err)
                    {
                      res.json({"message":err})
                    }
                    //Jika stock cukup
                    else
                    {
                        //query penambahan
                        var query = "UPDATE `stock` SET `hargaTotal`=?,`jumlah`=? WHERE id = ?";
                        var table = [jumHargaBaru,jumStokbaru,id];
                        query = mysql.format(query, table);

                        connection.query(query,function(err,temp){
                        if(err)
                        {
                            res.json({"message":err});
                        }
                        else
                        {

                            res.json({"message":"penambahan stok berhasil.. stok "+jumStokbaru});
                        }
                        });

                    }

                });
           }

       });

   });
    //--tambah stock end..


//update nama param (id, namaBaru)
router.post("/updateStock",function(req,res)
{
    //request id
    var id = req.body.id;
    //reques id baru
    var idBaru = req.body.idBaru;
    //request nama baru
    var namaBaru = req.body.namaBaru;
    //request jumlah baru
    var jumBaru = req.body.jumBaru;
    //request hargaBaru
    var harBaru = req.body.harBaru;
    //query cek nama menu di db
    var queryLogin2 = "select id from stock where id = ?";
    var tableLogin2 = [id];
    queryLogin2 = mysql.format(queryLogin2,tableLogin2);

    connection.query(queryLogin2,function(err,temp)
    {
        //jika nama tidak cocok sama DB
        if(temp.length != 1)
        {
            res.json({"message":"id stock tidak ada di database"});
        }
        else if(err)
        {
          res.json({"message":err})
        }
        //jika nama cocok sama DB
        else
        {
            //query cek username di db
            var queryUpdate = "UPDATE `stock` SET `id` = ?, `nama`= ?,`jumlah`=?,`hargaTotal`=? WHERE id = ?";
            var tableUpdate= [idBaru,namaBaru,jumBaru,harBaru,id];
            queryUpdate = mysql.format(queryUpdate,tableUpdate);

            connection.query(queryUpdate,function(err,temp)
            {
                //jika query update tidak berhasil
                if(err)
                {
                    res.json({"message":queryUpdate});
                }
                //jika query update berhasil
                else
                {
                    res.json({"message":"Berhasil mengganti nama "});
                }
            });
        }
      });
  });
  //--update nama selesai...
  //insert menu param(id,nama,komposisi,harga,kuantitas)
      router.post("/inputMenu",function(req,res){
        //request id
        var id = req.body.id;
        //request nama
        var nama = req.body.nama;
        //request komposisi
        var komposisi = req.body.komposisi;
        //request harga
        var harga = req.body.harga;
        //request kuantitas
        var kuantitas = req.body.kuantitas;

         //query checking id jika sudah ada yang sama
         var query1 = "select id from menu where id = ?";
         var table1 = [id];
         query1 = mysql.format(query1,table1);

         connection.query(query1,function(err,temp)
         {
            //Jika id menu belum ada di database
            if(temp.length == 0 )
            {
                //query insert
                var query = "insert into `menu` (id,nama,komposisi,harga,kuantitas) VALUES (?,?,?,?,?)";
                var table = [id,nama,komposisi,harga,kuantitas];
                query = mysql.format(query, table);

                connection.query(query,function(err,temp){
                  if(err)
                  {
                      res.json({"message":"failed "+query});
                  }
                  else
                  {

                      res.json({"message":"input menu berhasil dengan nama "+nama});
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
              res.json({"message":err});
            }
         });
     });
      //--insert menu end..

      //tambah/kurang kuantitas param(id,jumTambah) ex : tambah 100 (jumTambah = 100), kurang 100 (jumTambah = -100)
      router.post("/tambahKuantitas",function(req,res){
         //request nama
         var id = req.body.id;
         //request jumlahBaru
         var jumTambah = req.body.jumTambah;

         //query cek id di db
         var queryKode = "select id from menu where id = ?" ;
         var tableKode = [id];
         queryKode = mysql.format(queryKode,tableKode);
         connection.query(queryKode,function(err,temp)
         {
             //jika id tidak ada di db
             if(temp.length==0)
             {
                 res.json({"message":"Kode input tidak ada di db "});
             }
             else if(err)
             {
               res.json({"message":err})
             }
             else
             {
                  //query jumlah stock cukup apa ga
                  var query1 = "select kuantitas from menu where id = ?";
                  var table1 = [id];
                  query1 = mysql.format(query1,table1);

                  connection.query(query1,function(err,temp)
                  {
                      var jumKuantitasBaru = temp[0].kuantitas - (-jumTambah);
                      //Jika penambahan melebihi kuota
                      if(jumStokbaru >= 255)
                      {
                          res.json({"message":"Penambahan melebihi kuota stok.. stok "+temp[0].jumlah});
                      }

                      //Jika stock cukup
                      else
                      {
                          //query penambahan
                          var query = "UPDATE `menu` SET 'kuantitas' = ? WHERE id = ?";
                          var table = [jumKuantitasBaru, id];
                          query = mysql.format(query, table);

                          connection.query(query,function(err,temp){
                          if(err)
                          {
                              res.json({"message":err});
                          }
                          else
                          {

                              res.json({"message":"penambahan kuantitas berhasil.. kuantitas "+jumKuantitasBaru});
                          }
                          });
                      }
                  });
             }
         });
     });
      //--update kuantitas end..

      //update nama param (id, namaBaru)
      router.post("/updateMenu",function(req,res)
      {
          //request id
          var id = req.body.id;

          //request id baru
          var idBaru = req.body.idBaru;
          //request nama baru
          var namaBaru = req.body.namaBaru;
          //request komposisi baru
          var komposisiBaru = req.body.komposisiBaru;
          //request harga baru
          var hargaBaru = req.body.hargaBaru;
          //request kuantitas baru
          var kuantitasBaru = req.body.kuantitasBaru;

          //query cek nama menu di db
          var queryLogin2 = "select id from menu where id = ?";
          var tableLogin2 = [id];
          queryLogin2 = mysql.format(queryLogin2,tableLogin2);

          connection.query(queryLogin2,function(err,temp)
          {
              //jika nama tidak cocok sama DB
              if(temp.length != 1)
              {
                  res.json({"message":"id menu tidak ada di database"});
              }
              else if(err)
              {
                res.json({"message":err})
              }
              //jika nama cocok sama DB
              else
              {
                  //query cek username di db
                  var queryUpdate = "UPDATE `menu` SET `id`=?,`nama`= ?,`komposisi`=?,`harga`=?,`kuantitas`=? WHERE id = ?";
                  var tableUpdate= [idBaru,namaBaru,komposisiBaru,hargaBaru,kuantitasBaru,id];
                  queryUpdate = mysql.format(queryUpdate,tableUpdate);

                  connection.query(queryUpdate,function(err,temp)
                  {
                      //jika query update tidak berhasil
                      if(err)
                      {
                          res.json({"message":err});
                      }
                      //jika query update berhasil
                      else
                      {
                          res.json({"message":"Berhasil diUpdate"});
                      }
                  });
              }
            });
        });
        //--update nama selesai...

            router.post("/insertOrder",function(req,res){
                // param
                var nomerorder = req.body.nomerorder;
                var id = req.body.id;
                var date = req.body.date;
                var pesanan = req.body.pesanan;
                var quantity = req.body.quantity;
                var diskon = req.body.diskon;
                var hargasatuan = req.body.hargasatuan;
                var hargaDiskon = hargasatuan-(diskon/100*hargasatuan);
                var hargaTotal = hargaDiskon*quantity;
                //query insert
                var query = "insert into `order` (nomerorder,id,date,pesanan,quantity,diskon,hargasatuan,hargaakhir) VALUES (?,?,?,?,?,?,?,?)";
                var table = [nomerorder,id,date,pesanan,quantity,diskon,hargasatuan,hargaTotal];
                query = mysql.format(query,table);

                //sukses, kembalikan total harga
                connection.query(query,function(err,success){
                    if(err){
                        res.json({"message":"error"+query+hargaTotal});
                    }
                    else{
                        //query copy isi tabel ke laporan harian,mingguan,bulanan
                        //var query2 = "insert into `laporanharian` select * from `order`"
                        //connection.query(query2,function(err,success){
                            //if(err){
                                //res.json({"message":"error copy data ke laporan"+query2});
                    //}
                            //else{
                                //res.json({"message":"Berhasil input order dan copy ke database" + query2 + hargaDiskon});
                            //}
                        res.json({"message":"Berhasil input order" + query + hargaTotal});
                    }
                });


                });

            router.post("/deleteOrder",function(req,res){

                // param tanggal
                var nomerorder = req.body.nomerorder;
                var id = req.body.id;
                // pilih harga berdasarkan tanggal
                var query = "DELETE FROM `order` WHERE nomerorder=? AND id=?";
                var table = [nomerorder,id];
                query = mysql.format(query,table);

                //sukses, kembalikan total harga
                connection.query(query,function(err,success){
                    if(err){
                        res.json({"message":"gagal menghapus"+query+nomerorder+id})
                    }else{
                       res.json({"message":"berhasil menghapus"+query+nomerorder+id});
                    }
                });
            });

            router.post("/showOrder",function(req,res){

                var query = "select * from `order`";
                //sukses, kembalikan total harga
                connection.query(query,function(err,success){
                    if(err){
                        res.json({"message":"gagal menampilkan"+query})
                    }else{
                        for(i=0;i<success.length;i++){
                            res.json({"message":success});
                        }
                    }
                });
            });

            router.post("/updateOrder",function(req,res){
                var nomerorder = req.body.nomerorder;
                var id = req.body.id;
                //var date = req.body.date;
                var pesanan = req.body.pesanan;
                var quantity = req.body.quantity;
                var diskon = req.body.diskon;
                var hargasatuan = req.body.hargasatuan;
                var hargaDiskon = hargasatuan-(diskon/100*hargasatuan);
                var hargaTotal = hargaDiskon*quantity;


                var query = "UPDATE `order` SET `Pesanan`=?,`Quantity`=?,`Diskon`=?,`HargaSatuan`=?,`HargaAkhir`=? WHERE nomerorder=? AND id=?";
                var table = [pesanan,quantity,diskon,hargasatuan,hargaTotal,nomerorder,id];
                query = mysql.format(query,table);
                //sukses, kembalikan total harga
                connection.query(query,function(err,success){
                    if(err){
                        res.json({"message":"gagal update"+query})
                    }else{
                        res.json({"message":"berhasil update"+query});
                    }
                });
            });

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
               var queryKode = "select* from history";
               queryKode = mysql.format(queryKode);
               connection.query(queryKode,function(err,temp)
               {
                   //jika id tidak ada di db
                   if(err)
                   {
                       res.json({"message":""});
                   }
                   else
                   {
                        res.json({"message":temp});
                   }
               });
           });
            //--show history end.

//insert history (id, namaUser, perubahan, row)
router.get("/insertPegawai",function(req,res){
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
            res.json({"message":"failed"});
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
        res.json({"message":"Berhasil Update Supplier"});
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
router.post("/hitungHarian",function(req,res){

    // param tanggal
    var date = req.body.date;
    //var nomerorder=req.body.nomerorder;
    var totalHarga=Number(0);
    // pilih harga berdasarkan tanggal
    var query = "select pesanan,quantity,diskon,hargaAkhir from `order` where date = ?";
    var table = [date];
    query = mysql.format(query,table);

    //sukses, kembalikan total harga
    connection.query(query,function(err,success){
        if(err){
            res.json({"message":"tidak dapat menghitung total harian"+query})
        }else{
            var pesanan = "";
            var quantity = "";
            var diskon= "";
            var hargaAkhir = "";
            for(i=0;i<success.length;i++){
                pesanan+= success[i].pesanan+",";
                quantity+= success[i].quantity+",";
                diskon+= success[i].diskon+",";
                hargaAkhir+= success[i].hargaAkhir+",";
                totalHarga = Number(totalHarga)+Number(success[i].hargaAkhir);
           }
            res.json({"pesanan": pesanan,"quantity":quantity,"diskon":diskon,"Harga Akhir":hargaAkhir,"Total Harga":totalHarga});

        }
    });
});

router.post("/insertDBHarian",function(req,res){

    // param tanggal
    var date = req.body.date;
    //var nomerorder=req.body.nomerorder;
    var totalHarga=Number(0);
    // pilih harga berdasarkan tanggal
    var query = "select quantity,diskon,hargaAkhir from `order` where date = ?";
    var table = [date];
    query = mysql.format(query,table);

    //sukses, kembalikan total harga
    connection.query(query,function(err,success){
        if(err){
            res.json({"message":"tidak dapat menghitung total harian"+query})
        }else{
            for(i=0;i<success.length;i++){
                totalHarga = Number(totalHarga)+Number(success[i].hargaAkhir);
           }
        //query untuk insert ke database Laporan Keuangan Harian
        var query2 = "insert into `laporanharian` (date,TotalPemasukkan) VALUES (?,?)";
        var table2 = [date,totalHarga];
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

// router.post("/hitungMingguan",function(req,res){
//
//     // param tanggal
//     var startdate = req.body.startdate;
//     var enddate = req.body.enddate;
//     var totalHarga=0;
//     // pilih harga berdasarkan tanggal
//     var query = "SELECT pesanan,quantity,diskon,hargaAkhir FROM `order` WHERE date BETWEEN '"+startdate+"'AND '"+enddate+"'" ;
//     // var table = [startdate,enddate];
//     // query = mysql.format(query,table);
//
//     //sukses, kembalikan total harga
//     connection.query(query,function(err,success){
//         if(err){
//             // res.json({"message":"tidak dapat menghitung total mingguan"+query})
//             res.json({"message":query})
//         }else{
//           var pesanan = "";
//           var quantity = "";
//           var diskon= "";
//           var hargaAkhir = "";
//           for(i=0;i<success.length;i++){
//               pesanan+= success[i].pesanan+",";
//               quantity+= success[i].quantity+",";
//               diskon+= success[i].diskon+",";
//               hargaAkhir+= success[i].hargaAkhir+",";
//               totalHarga = Number(totalHarga)+Number(success[i].hargaAkhir);
//          }
//           res.json({"pesanan": pesanan,"quantity":quantity,"diskon":diskon,"Harga Akhir":hargaAkhir,"Total Harga":totalHarga});
//         }
//     });
// });

router.post("/insertDBMingguan",function(req,res){

    // param tanggal
    var startdate = req.body.startdate;
    var enddate = req.body.enddate;
    //var nomerorder=req.body.nomerorder;
    var totalHarga=Number(0);
    // pilih harga berdasarkan tanggal
    var query = "SELECT pesanan,quantity,diskon,hargaAkhir FROM `order` WHERE date BETWEEN '"+startdate+"'AND '"+enddate+"'" ;
    //sukses, kembalikan total harga
    connection.query(query,function(err,success){
        if(err){
            res.json({"message":"tidak dapat menghitung total mingguan"+query})
        }else{
            for(i=0;i<success.length;i++){
                totalHarga = Number(totalHarga)+Number(success[i].hargaAkhir);
           }
        //query untuk insert ke database Laporan Keuangan Mingguan
        var query2 = "insert into `laporanmingguan` (startdate,enddate,TotalPemasukkan) VALUES ('"+startdate+"','"+enddate+"','"+totalHarga+"')";
        //var table2 = [date,totalHarga];
        //query2 = mysql.format(query2,table2)

        connection.query(query2,function(err,success){
          if(err){
            res.json({"message":"gagal memasukkan ke database mingguan"+query2});
          }
          else{
            res.json({"message":"berhasil memasukkan ke database mingguan"+query2});

          }

        });
        }
    });
});

//hitung bulanan
// router.post("/hitungtotalpendapatanBulanan",function(req,res){
//    var bulan = req.body.bulan;
//    var tahun = req.body.tahun;
//    var queryKode = "select TotalPemasukkan from `laporanharian` where EXTRACT(MONTH from date)=? AND EXTRACT(YEAR from date)=?";
//    var table = [bulan,tahun];
//    queryKode = mysql.format(queryKode,table);
//    connection.query(queryKode,function(err,success)
//    {
//        //jika id tidak ada di db
//        if(err)
//        {
//            res.json({"message":"error"+ queryKode});
//        }
//        else
//        {
//          var totalPendapatanBulanan = 0;
//          for (var i = 0; i < success.length; i++) {
//            totalPendapatanBulanan=Number(totalPendapatanBulanan)+success[i].TotalPemasukkan;
//          }
//
//             res.json({"message":totalPendapatanBulanan});
//        }
//    });
// });

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


module.exports = APIarthentic;
