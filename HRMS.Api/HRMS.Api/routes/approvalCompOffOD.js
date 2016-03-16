var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');


router.post('/getFiledCompOff', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log(req.body.Id);
        var tableObjectValue = new Array(req.body.Id,'');
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
    });
});


router.post('/getFiledOD', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id,'');
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
    });
});


router.post('/approveCompOff', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id, req.body.compOffStatus,'');
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
    });
});

router.post('/approveOD', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id, req.body.ODStatus,'');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_ApprovRejectFileODByReportingHead', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in approving OD: ');
                console.log(err);
            } else {
                res.json({
                    type: true,
                    data: 'Status Updated'
                });
            }
        });
    });
});

module.exports = router;