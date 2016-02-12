var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');

router.post('/login', function (req, res) {
    console.log('In NodeJS Service');
    console.log(req.body);
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array("SelectByUserName", req.body.email, "");
        var pm = conn.procedureMgr();
        pm.callproc('sp_SelectDeleteLogin', tableObjectValue, function (err, results, output) {
            console.log(results);
            if (err) {
                console.log(err);
            } else {
                if (results.length > 0) {
                    sql.open(sqlConfig, function (err, conn) {
                        var tableObjectValue = new Array("SelectByEmail", results[0].Email);
                        var pm = conn.procedureMgr();
                        pm.callproc('sp_SelectDeleteEmployeeDetails', tableObjectValue, function (err, result1, output) {
                            if (err) {
                                console.log(err);
                            } else {
                                res.json({
                                    type: true,
                                    data: result1
                                });
                            }
                        });
                        if (err) {
                            console.log('Connection Error: ' + err);
                        }
                    });
                }
            }
        });
        if (err) {
            console.log('Connection Error: ' + err);
        }
    });
});

module.exports = router;