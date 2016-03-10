var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');

router.get('/getAllRelations', function (req, res) {
    //console.log(req.param);
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array();
        console.log('Table Object Value: ');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetAllRelations', tableObjectValue, function (err, results, output) {
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

router.get('/getAllEmployees', function (req, res) {
    //console.log(req.param);
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array();
        console.log('Table Object Value: ');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetAllEpmloyees', tableObjectValue, function (err, results, output) {
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

router.post('/getMasterValues', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.MasterTypeId, "");
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_SelectMasterValue', tableObjectValue, function (err, results, output) {
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

router.post('/updateEmployeeDetails', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.Id, req.body.userEmail, req.body.firstName, req.body.lastName, req.body.team, req.body.designation, req.body.gender, req.body.maritalStatus, req.body.children1, req.body.children2, req.body.currentAddress, req.body.permanentAddress, req.body.personalEmail, req.body.contactNo, req.body.emergenyCntctNo, req.body.emergencyCntctName, req.body.relationWithEmrgncyCntct, req.body.bloodGrp, req.body.dateOfJoining, req.body.dob, req.body.nominee, req.body.relationWithNominee, req.body.skypeId, req.body.passportNo, req.body.passportIssueDate, req.body.passportExpiryDate, req.body.passportIssuePlace, req.body.panNo, req.body.bankAccountNo, req.body.repotingHead, req.body.pfNo, req.body.uan,"");
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_InsertUpdateEmployeeDetails', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log(err);
            } else {
                if (results.length > 0) {
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