var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');

router.post('/getAbsents', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.EmpId,"");
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetAbsentByEmployeeId', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error: ');
                console.log(err);
            }else{
                if(results.length>0){
                    console.log(results);
                    res.json({
                        type:true,
                        data:results
                    });
                }
            }
        });
    });
});

router.get('/getCompOffs', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log(req.query.EmpId);
        var tableObjectValue = new Array(req.query.EmpId,"");
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('Sp_GetCompOffByEmployeeId', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error: ');
                console.log(err);
            }else{
                if(results.length>0){
                    console.log(results);
                    res.json({
                        type:true,
                        data:results
                    });
                }
            }
        });
    });
});

module.exports = router;