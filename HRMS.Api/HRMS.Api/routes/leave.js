var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');
var connectionConfig = require('../config/sqlConfig.json');
var sqlConnection = require('tedious').Connection;

var config = {
    server: connectionConfig.server,
    database: connectionConfig.database,
    userName: connectionConfig.userName,
    password: connectionConfig.password,
    options: {
        database: connectionConfig.database,
        rowCollectionOnRequestCompletion: true,
        useColumnNames: true
    }
};

router.post('/getAbsents', function (req, res) {
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        // If no error, then good to proceed.
        executeStatement();
    });
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec sp_GetAbsentByEmployeeId @EmployeeId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetAbsentByEmployeeId');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });
        request.addParameter('EmployeeId', TYPES.VarChar, req.body.EmpId.value);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.EmpId, "");
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetAbsentByEmployeeId', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error in Getting Absents: ');
                console.log(err);
            } else {
                if (results.length > 0) {
                    console.log(results);
                    res.json({
                        type: true,
                        data: results
                    });
                }
            }
        });
    });*/
});

router.post('/fileOD', function (req, res) {
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        // If no error, then good to proceed.
        executeStatement();
    });
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec sp_FileOD @AbsentId, @ODReason", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_FileOD');
                console.log(rows);
                res.json({
                    type: true,
                    data: 'OD Updated'
                });
            }
        });

        request.addParameter('AbsentId', TYPES.Int, req.body.Id.value);
        request.addParameter('ODReason', TYPES.VarChar, req.body.ODReason.value);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id, req.body.ODReason);
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_FileOD', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in File OD: ');
                console.log(err);
            } else {
                res.json({
                    type: true,
                    data: 'OD Updated'
                });
            }
        });
    });*/
});


router.post('/getCompOffs', function (req, res) {
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        // If no error, then good to proceed.
        executeStatement();
    });
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec sp_GetCompOffByEmployeeId @EmployeeID", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetCompOffByEmployeeId');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });
        request.addParameter('EmployeeID', TYPES.VarChar, req.body.EmpId.value);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        console.log('In Get Offs API');
        console.log(req.query.EmpId);
        var tableObjectValue = new Array(req.query.EmpId, "");
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetCompOffByEmployeeId', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error: ');
                console.log(err);
            } else {
                if (results.length > 0) {
                    //  console.log(results);
                    res.json({
                        type: true,
                        data: results
                    });
                }
            }
        });
    });*/
});

router.post('/insertCompOff', function (req, res) {
    //   console.log('insertCompOff');
    console.log(req.body);
    IsCompOffExist(req.body.CompOffDate.value, req.body.EmpId.value, function (IsExist) {

        if (IsExist) {
            //  console.log('in true');
            // console.log('CompOff Is Already Exist');
            res.json({
                type: true,
                data: 'CompOff Is Already Exist'
            });
        } else {
            //  console.log('in false');
            var connection = new sqlConnection(config);
            connection.on('connect', function (err) {
                if (err) {
                    return console.error(err);
                }
                // If no error, then good to proceed.
                executeStatement();
            });
            var Request = require('tedious').Request;
            var TYPES = require('tedious').TYPES;

            function executeStatement() {
                request = new Request("exec Sp_InsertCompOff @EmpId, @CompOffDate, @StartTime, @EndTime, @CompOffStatus, @IsManual, @CompOffReason", function (err, rowCount, rows) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Sp_InsertCompOff');
                        console.log(rows);
                        res.json({
                            type: true,
                            data: 'CompOff Applied'
                            
                        });
                    }
                });
                request.addParameter('EmpId', TYPES.VarChar, req.body.EmpId.value);
                request.addParameter('CompOffDate', TYPES.Date, req.body.CompOffDate.value);
                request.addParameter('StartTime', TYPES.NVarChar, '');
                request.addParameter('EndTime', TYPES.NVarChar, '');
                request.addParameter('CompOffStatus', TYPES.Int, req.body.CompOffStatus);
                request.addParameter('IsManual', TYPES.Bit, req.body.isManual);
                request.addParameter('CompOffReason', TYPES.NVarChar, req.body.compOffReason.value);
                connection.execSql(request);
            }
            /*sql.open(sqlConfig, function (err, conn) {
                //  console.log(req.body);
                var tableObjectValue = new Array(req.body.EmpId, req.body.CompOffDate, '', '', c, req.body.isManual, req.body.compOffReason, '');
                //  console.log(tableObjectValue);
                var pm = conn.procedureMgr();
                pm.callproc('Sp_InsertCompOff', tableObjectValue, function (err, result, output) {
                    if (err) {
                        console.log('Error in Applying CompOff: ');
                        console.log(err);
                    } else {
                        res.json({
                            type: true,
                            data: 'CompOff Applied'
                        });
                    }
                });
            });*/
        }
    });

});

router.post('/markCompOff', function (req, res) {
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        // If no error, then good to proceed.
        executeStatement();
    });
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec sp_MarkComOff @CompOff", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_MarkComOff');
                console.log(rows);
                res.json({
                    type: true,
                    data: 'CompOff Marked'
                });
            }
        });

        request.addParameter('CompOff', TYPES.Int, req.body.Id.value);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_MarkComOff', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in Marking CompOff: ');
                console.log(err);
            } else {
                res.json({
                    type: true,
                    data: 'CompOff Marked'
                });
            }
        });
    });*/
});

router.post('/getAppliedLeaves', function (req, res) {
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        // If no error, then good to proceed.
        executeStatement();
    });
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec sp_GetappliedLeavesByEmployeeId @EmployeeID", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetappliedLeavesByEmployeeId');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                } else {
                    res.json({
                        type: true,
                        data: 'No Records Found'
                    });
                }
            }
        });

        request.addParameter('EmployeeID', TYPES.Int, req.body.EmpId.value);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.EmpId, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetappliedLeavesByEmployeeId', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    res.json({
                        type: true,
                        data: result
                    });
                } else {
                    res.json({
                        type: true,
                        data: 'No Records Found'
                    });
                }
            }
        });
    });*/
});

router.post('/insertLeave', function (req, res) {
    console.log(req.body);
    IsLeaveDateExist(req.body.FromDate, req.body.ToDate, req.body.EmpId.value, function (IsExist) {
        console.log(IsExist);
        if (IsExist) {
            //  console.log('in true');
            // console.log('CompOff Is Already Exist');
            res.json({
                type: true,
                data: 'Leave on same Date Already Exists'
            });
        } else {
            console.log('Hitting Insert Leaves Api');
            var connection = new sqlConnection(config);
            connection.on('connect', function (err) {
                if (err) {
                    return console.error(err);
                }
                // If no error, then good to proceed.
                executeStatement();
            });
            var Request = require('tedious').Request;
            var TYPES = require('tedious').TYPES;

            function executeStatement() {
                request = new Request("exec Sp_InsertLeave @EmpId, @FromDate, @ToDate, @Reason, @Status", function (err, rowCount, rows) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Sp_InsertLeave');
                        console.log(rows);
                        res.json({
                            type: true,
                            data: 'Leave Applied'
                        });
                    }
                });

                request.addParameter('EmpId', TYPES.VarChar, req.body.EmpId.value);
                request.addParameter('FromDate', TYPES.Date, req.body.FromDate);
                request.addParameter('ToDate', TYPES.Date, req.body.ToDate);
                request.addParameter('Reason', TYPES.NVarChar, req.body.Reason);
                request.addParameter('Status', TYPES.Int, req.body.Status);

                connection.execSql(request);
            }
            /*sql.open(sqlConfig, function (err, conn) {
                var tableObjectValue = new Array(req.body.EmpId, req.body.FromDate, req.body.ToDate, req.body.Reason, req.body.Status, '');
                console.log('Leave Data:');
                // console.log(tableObjectValue);
                var pm = conn.procedureMgr();
                pm.callproc('Sp_InsertLeave', tableObjectValue, function (err, result, output) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            type: true,
                            data: 'Leave Applied'
                        });
                    }
                });
            });*/
        }
    });

});

function IsCompOffExist(CompOffDate, EmpId, CallBack) {
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        // If no error, then good to proceed.
        executeStatement();
    });
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec Sp_IsDuplicateCompoff @CompOffDate, @empId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sp_IsDuplicateCompoff');
                console.log(rows);
                if (rows[0].RCount.value > 0) {
                    CallBack(true);
                } else {
                    //  console.log('CallBack false');
                    CallBack(false);
                }
            }
        });
        request.addParameter('CompOffDate', TYPES.Date, CompOffDate);
        request.addParameter('empId', TYPES.VarChar, EmpId);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        //console.log(req.body);
        var tableObjectValue = new Array(CompOffDate, EmpId);
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('Sp_IsDuplicateCompoff', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in IsCompOffExist: ');
                console.log(err);
            } else {
                //console.log('IsCompOffExist');
                //  console.log(CompOffDate);
                if (result[0].RCount > 0) {
                    // console.log('CallBack true');
                    CallBack(true);
                } else {
                    //  console.log('CallBack false');
                    CallBack(false);
                }
            }
        });
    });*/
}


function IsLeaveDateExist(FromDate, ToDate, EmpId, CallBack) {
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        // If no error, then good to proceed.
        executeStatement();
    });
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec Sp_IsDuplicateApplyLeave @FromDate, @ToDate, @empId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sp_IsDuplicateApplyLeave');
                console.log(rows);
                if (rows[0].RCount.value > 0) {
                    CallBack(true);
                } else {
                    //  console.log('CallBack false');
                    CallBack(false);
                }
            }
        });
        request.addParameter('FromDate', TYPES.Date, FromDate);
        request.addParameter('ToDate', TYPES.Date, ToDate);
        request.addParameter('empId', TYPES.VarChar, EmpId);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        //console.log(req.body);
        var tableObjectValue = new Array(FromDate, ToDate, EmpId);
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('Sp_IsDuplicateApplyLeave', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in IsLeaveDateExist: ');
                console.log(err);
            } else {
                if (result[0].RCount > 0) {
                    // console.log('CallBack true');
                    CallBack(true);
                } else {
                    //  console.log('CallBack false');
                    CallBack(false);
                }
            }
        });
    });*/
}

module.exports = router;