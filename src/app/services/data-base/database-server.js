var express = require('express');
var app = express();
var urlencode = require('urlencode');


var sql = require("mssql");
var config = {
    user: 'WebUser',
    password: 'W3bUSR123',
    server: 'localhost',
    database: 'Clientes'
};
var connection;
var request;





app.get('/select', function (req, res) {
    //Se muestra qué consulta se hace y se configura la respuesta del servidor
    console.log("SELECT *");
    res.setHeader('Access-Control-Allow-Origin', '*');
    //se inicializa la conexión y se hace la consulta
    sql.connect(config,function (err) {
        request = new sql.Request();
        request.query('select * from dbo.Cliente', function (err, recordset) {
            sql.close();
            if (err)
                res.json({
                    ERROR: err
                });
            else
                res.json({
                    SQLreturn: recordset.recordsets
                });

        });
    });
});

app.get('/select/:ID', function (req, res) {
    console.log("SELECT * WHERE id = " + req.params.ID);
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql.connect(config,function (err) {
        request = new sql.Request();
        request.query('select * from dbo.Cliente where pk_cliente_id =' + urlencode.decode(req.params.ID), function (err, recordset) {
            sql.close();
            if (err)
                res.json({
                    ERROR: err
                });
            else
                res.json({
                    SQLreturn: recordset.recordsets
                });

        });
    });
});

app.get('/insert/:ID/:Nombre/:Apellido/:Fecha', function (req, res) {
    console.log("INSERT VALUES id = " + req.params.ID);
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql.connect(config,function (err) {
        request = new sql.Request();
        try {
            request.query('insert into Cliente values (' + urlencode.decode(req.params.ID) + ',\'' + urlencode.decode(req.params.Nombre) + '\',\'' + urlencode.decode(req.params.Apellido) + '\',\'' + urlencode.decode(req.params.Fecha) + '\',NULL,NULL,NULL,NULL)', function (err, recordset) {
                sql.close();
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
            res.json({
                ERROR: err
            });
        }       
    });
});


app.get('/update/:ID/:NombreEmp/:NIT/:Salario/:Fecha', function (req, res) {
    console.log("UPDATE VALUES id = " + req.params.ID);
    res.setHeader('Access-Control-Allow-Origin', '*');
    sql.connect(config,function (err) {
        request = new sql.Request();
        try {
            request.query('update Cliente set cliente_NombreDeEmpresa=\'' + urlencode.decode(req.params.NombreEmp) +'\', cliente_NIT = ' + urlencode.decode(req.params.NIT) + ', cliente_Salario = ' + urlencode.decode(req.params.Salario) +', cliente_FechaDeIngreso = \''+ urlencode.decode(req.params.Fecha) +'\'  where pk_cliente_id = ' +  urlencode.decode(req.params.ID), function (err, recordset) {
                sql.close();
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
            res.json({
                ERROR: err
            });
        }
    });
});


app.listen(5000, function () {
    console.log('Server is running..');

});