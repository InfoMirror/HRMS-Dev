var express = require('express');
var router = express.Router();
//var sql = require('msnodesqlv8');
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
        useColumnNames: true,
		instanceName: connectionConfig.instanceName
    }
};

router.post('/getFiledCompOff', function (req, res) {
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
        request = new Request("exec sp_getFiledCompOffsByReportingHeads @ReportingHead", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getFiledCompOffsByReportingHeads');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });
        // console.log(req.body);

        request.addParameter('ReportingHead', TYPES.Int, req.body.Id.value);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        console.log(req.body.Id);
        var tableObjectValue = new Array(req.body.Id, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_getFiledCompOffsByReportingHeads', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error in Getting CompOffs: ');
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


router.post('/getFiledOD', function (req, res) {
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
        request = new Request("exec sp_getFiledODByReportingHead @EmployeeID", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getFiledODByReportingHead');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        request.addParameter('EmployeeID', TYPES.Int, req.body.Id.value);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_getFiledODByReportingHead', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error in Getting ODs: ');
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
        request = new Request("exec sp_GetAppliedLeavesByReportingHead @ReportingHead", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetAppliedLeavesByReportingHead');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        request.addParameter('ReportingHead', TYPES.Int, req.body.Id.value);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetAppliedLeavesByReportingHead', tableObjectValue, function (err, results, output) {
            if (err) {
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


router.post('/approveCompOff', function (req, res) {
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
    console.log(req.body);

    function executeStatement() {
        request = new Request("exec sp_ApproveCompOffByReportingHead @CompOff, @CompOfStatus", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_ApproveCompOffByReportingHead');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        request.addParameter('CompOff', TYPES.Int, req.body.Id.value);
        request.addParameter('CompOfStatus', TYPES.Int, req.body.compOffStatus);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id, req.body.compOffStatus, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_ApproveCompOffByReportingHead', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in approving CompOff: ');
                console.log(err);
            } else {
                res.json({
                    type: true,
                    data: 'Status Updated'
                });
            }
        });
    });*/
});

router.post('/approveOD', function (req, res) {
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
        request = new Request("exec sp_ApprovRejectFileODByReportingHead @AbsentId, @ODStatus", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                    console.log(req.body);
                console.log('sp_ApprovRejectFileODByReportingHead');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });
        console.log(req.body);
        request.addParameter('AbsentId', TYPES.Int, req.body.Id.value);
        request.addParameter('ODStatus', TYPES.Int, req.body.ODStatus);
        connection.execSql(request);
    }
});

router.post('/approveLeave', function (req, res) {
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
    console.log(req.body);

    function executeStatement() {
        request = new Request("exec sp_UpdateLeaveStatus @Id, @Status", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_UpdateLeaveStatus');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });
        console.log(req.body);
        request.addParameter('Id', TYPES.Int, req.body.Id.value);
        request.addParameter('Status', TYPES.Int, req.body.Status);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.Id, req.body.Status, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_UpdateLeaveStatus', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in approving Leave: ');
                console.log(err);
            } else {
                res.json({
                    type: true,
                    data: 'Status Updated'
                });
            }
        });
    });*/
});

module.exports = router;