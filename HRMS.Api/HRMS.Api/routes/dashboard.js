var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');


router.post('/getEmpProfileData', function (req, res) {
    console.log(req.body);
    sql.open(sqlConfig, function (err, conn) {
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
    });
});

router.get('/getBirthdays', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
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
    });
});

router.get('/getAnniversary', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
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
    });
});

router.get('/getHolidays', function (req, res) {
     console.log('Table Object Value: ');
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
    });
});

router.post('/getLeaveSummary', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.EmpId, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetLeaveSummaryWithBreakup', tableObjectValue, function (err, results, output) {
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
    });
});

router.get('/getHolidayCalendar', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array();
        console.log('Table Object Value: ');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_getHolidayCalendar', tableObjectValue, function (err, results, output) {
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
    });
});
module.exports = router;