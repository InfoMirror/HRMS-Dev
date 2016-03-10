var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');

router.post('/login', function (req, res) {
    console.log('In NodeJS Service');
    // console.log(req.body);
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array("SelectByUserName", req.body.email, "");
        var pm = conn.procedureMgr();
        pm.callproc('sp_SelectDeleteLogin', tableObjectValue, function (err, results, output) {

            if (err) {
                console.log(err);
            } else {
                if (results.length > 0) {
                    console.log(results);
                    sql.open(sqlConfig, function (err, conn) {
                        var tableObjectValue = new Array("SelectByEmail", results[0].Email);
                        console.log('Getting Employee Details');
                        console.log(tableObjectValue);
                        var pm = conn.procedureMgr();
                        pm.callproc('sp_SelectDeleteEmployeeDetails', tableObjectValue, function (err, result1, output) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(result1);
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
                } else {
                    sql.open(sqlConfig, function (err, conn) {
                        var tableObjectValue = new Array('', req.body.email);
                        var pm = conn.procedureMgr();
                        pm.callproc('sp_InsertUpdateLogin', tableObjectValue, function (err, results, output) {
                            console.log('insert');

                            if (err) {
                                console.log(err);
                            } else {
                                sql.open(sqlConfig, function (err, conn) {
                                    var tableObjectValue = new Array("SelectByEmail", req.body.email);
                                    var pm = conn.procedureMgr();
                                    pm.callproc('sp_SelectDeleteEmployeeDetails', tableObjectValue, function (err, result1, output) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            res.json({
                                                type: true,
                                                data: result1
                                            });
                                            sql.open(sqlConfig, function (err, conn) {
                                                var parms = new Array(result1[0].EmpId, "");
                                                var pm = conn.procedureMgr();
                                                pm.callproc('sp_AllotLeaves', parms, function (err, result, output) {
                                                    if (err) {
                                                        console.log(err);
                                                    } else {
                                                        res.json({
                                                            type: true,
                                                            data: 'Leaves Alloted'
                                                        });
                                                        console.log(res);
                                                    }
                                                });
                                            });
                                        }
                                    });
                                    if (err) {
                                        console.log('Connection Error: ' + err);
                                    }
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



function insertupdateuser(userid, email) {
    sql.open(config, function (err, conn) {
        var tableObjectValue = new Array(userid, email);
        var pm = conn.procedureMgr();
        pm.callproc('sp_InsertUpdateLogin', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log(err);
            } else {
                console.log(output[0]);
                console.log(results);
            }
        });
        if (err) {
            console.log('Connection Error: ' + err);
        }

    });
}
var empData = [];

function selectEmployeeDetails(email) {
    sql.open(config, function (err, conn) {
        //  console.log(res.body.email);
        var tableObjectValue = new Array("SelectByEmail", email);
        var pm = conn.procedureMgr();
        pm.callproc('sp_SelectDeleteEmployeeDetails', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log(err);
            } else {
                //  console.log(results);
                empData = results;
                return results;
            }
        });
        if (err) {
            console.log('Connection Error: ' + err);
        }



    });
}
module.exports = router;