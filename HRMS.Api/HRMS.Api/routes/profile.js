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
    console.log("req.param");
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
        var tableObjectValue = new Array(req.body.Id, req.body.UserEmail,req.body.EmpId, req.body.FirstName, req.body.LastName, req.body.Team, req.body.Designation, req.body.Gender, req.body.MaritalStatus, req.body.Children1, req.body.Children2, req.body.CurrentAddress, req.body.PermanentAddress, req.body.PersonalEmail, req.body.ContactNo, req.body.EmergencyContactNo, req.body.NameOfEC, req.body.RelationWithEC, req.body.BloodGroup, req.body.DOJ, req.body.DOB, req.body.Nominee, req.body.RelationWithNominee, req.body.SkypeID, req.body.PassportNumber, req.body.PassportIssueDate, req.body.PassportExpiryDate, req.body.PassportIssuePlace, req.body.PanCard, req.body.BankAccountNumber, req.body.ReportingHead, req.body.PFNo, req.body.UAN, req.body.ProfileStatus,req.body.ownVisa,req.body.visaCountry,req.body.visaExpiryDate);
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_InsertUpdateEmployeeDetails', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    type: true,
                    data: 'Profile Updated'
                });
            }
        });
    });
});


router.post('/getEmpDetails', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array('SelectByEmail', req.body.UserEmail, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_SelectDeleteEmployeeDetails', tableObjectValue, function (err, results, output) {
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

router.post('/getApprovalReqEmp', function (req, res) {
   
    
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array();
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetApprovalReqEmp', tableObjectValue, function (err, results, output) {
             console.log(results);
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