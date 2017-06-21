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

router.post('/getEmpProfileData', function (req, res) {
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
        request = new Request("exec sp_SelectDeleteEmployeeDetails @Action, @UserEmail", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_SelectDeleteEmployeeDetails');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        request.addParameter('Action', TYPES.VarChar, 'SelectByEmailForDashboard');
        request.addParameter('UserEmail', TYPES.VarChar, req.body.UserEmail);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array('SelectByEmailForDashboard', req.body.UserEmail, '');
        var pm = conn.procedureMgr();
        pm.callproc('sp_SelectDeleteEmployeeDetails', tableObjectValue, function (err, results, output) {
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

router.get('/getBirthdays', function (req, res) {
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
        request = new Request("exec sp_getUpcomingBirthdays", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getUpcomingBirthdays');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array();
        console.log('Table Object Value: ');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_getUpcomingBirthdays', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error: ');
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

router.get('/getAnniversary', function (req, res) {
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
        request = new Request("exec sp_getUpcominAnniversary", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getUpcominAnniversary');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array();
        console.log('Table Object Value: ');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_getUpcominAnniversary', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error: ');
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

router.get('/getHolidays', function (req, res) {
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
        request = new Request("exec sp_getFestiveHolidays", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getFestiveHolidays');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        connection.execSql(request);
    }
    /* console.log('Table Object Value: ');
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array();
        console.log('Table Object Value: ');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_getFestiveHolidays', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error: ');
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

router.post('/getLeaveSummary', function (req, res) {
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
        request = new Request("exec sp_GetLeaveSummaryWithBreakup @EmpId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetLeaveSummaryWithBreakup');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });
        request.addParameter('EmpId', TYPES.VarChar, req.body.EmpId.value);
        connection.execSql(request);
 } 
});

router.get('/getHolidayCalendar', function (req, res) {
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
        request = new Request("exec sp_getHolidayCalendar", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getHolidayCalendar');
                console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        connection.execSql(request);
    }   
});
module.exports = router;