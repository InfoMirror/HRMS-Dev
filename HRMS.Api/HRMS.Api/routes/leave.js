var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');

router.post('/getAbsents', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
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
    });
});

router.post('/fileOD', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
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
    });
});


router.get('/getCompOffs', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
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

router.post('/insertCompOff', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.EmpId, req.body.CompOffDate, req.body.startTime, req.body.endTime, req.body.compOffStatus, req.body.isManual, req.body.compOffReason);
        console.log(tableObjectValue);
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
    });
});

router.post('/MarkCompOff', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.EmpId);
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
    });
});


module.exports = router;