var express = require('express');
var app = express();
var sql = require("mssql");

app.get('/select', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    var request = new sql.Request();
    
     request.query('select * from dbo.Cliente', function (err, recordset) {
     
     if (err) console.log(err)

     res.json({
        SQLreturn: recordset.recordsets
    });
     
 });
   
});

app.get('/select/:ID', function(req,res) {
    console.log(req.params.ID);    
    var request = new sql.Request();
    request.query('select * from dbo.Cliente where pk_cliente_id =' + req.params.ID, function (err, recordset) {
        
        if (err) console.log(err)
   
        res.json({
           SQLreturn: recordset.recordsets
       });
        
    });
});

app.get('/insert/:ID/:Nombre/:Apellido/:Fecha', function(req,res) {
    console.log(req.params.ID);    
    var request = new sql.Request();
    try {
        
    request.query('insert into Cliente values (' + req.params.ID+',\''+ req.params.Nombre +'\',\''+ req.params.Apellido + '\',\''  + req.params.Fecha +'\',NULL,NULL,NULL,NULL)', function (err, recordset) {
        
        if (err) 
         res.json({
            ERROR: err
        });
        else
        res.json({
           SQLreturn: recordset.rowsAffected
       });
        
    });
    } 

    catch (error) {
       
    }
});


function Connection(){

    // config for your database
    var config = {
        user: 'WebUser',
        password: 'W3bUSR123',
        server: 'localhost', 
        database: 'Clientes' 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object

    });
    
}

var server = app.listen(5000, function () {
    console.log('Server is running..');
    Connection();
});