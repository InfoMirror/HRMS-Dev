var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');
var sqlConnection = require('tedious').Connection;
var config = {
    server: 'MAYANK-PC',
    database: 'dbHRMS',
    userName: 'mayankdbhrms',
    password: 'mayankdbhrms',
    options: {
        database: 'dbHRMS',
        rowCollectionOnRequestCompletion: true,
        useColumnNames: true,
        port: '49172'
    }
};
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
    var connection = new sqlConnection(config);
    /* var Request = require('tedious').Request;
     var TYPES = require('tedious').TYPES;
     connection.on('connect', function(err) {
                                          request = new Request("exec TestProc @p1,@p2",function(err,rowC,rws){
                                             if(err){
                                                 console.log(err);
                                             }else{
                                                 console.log(rws); 
                                                  connection.on('connect', function(err) {
                                          request = new Request("exec sp_AllotLeaves @EmpId",function(err,rowC,rws){
                                               console.log('done2'); 
                                             if(err){
                                                 console.log(err);
                                             }else{
                                                 console.log('done'); 
                                             }
                                              
                                          });
                                       
                                      request.addParameter('EmpId', TYPES.Int,req.body.EmpId); 
                                       connection.execSql(request);
                                     });
                                             }
                                              
                                          });
                                       
                                      request.addParameter('p1', TYPES.Int,null); 
         request.addParameter('p2', TYPES.Date,null); 
                                       connection.execSql(request);
                                     });*/

    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        // If no error, then good to proceed.
        console.log("Connected");
        executeStatement();
    });
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {

        request = new Request("exec sp_InsertUpdateEmployeeDetails @Id,@UserEmail,@EmpId,@FirstName,@LastName,@Team,@Designation,@Gender,@MaritalStatus,@Children1,@Children2,@CurrentAddress,@PermanentAddress,@PersonalEmail,@ContactNo,@EmergencyContactNo,@NameOfEC,@RelationWithEC,@BloodGroup,@DOJ,@DOB,@Nominee,@RelationWithNominee,@SkypeID,@PassportNumber,@PassportIssueDate,@PassportExpiryDate,@PassportIssuePlace,@PanCard,@BankAccountNumber,@ReportingHead,@PFNo,@UAN,@ProfileStatus,@ownVisa,@visaCountry,@visaExpiryDate", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_InsertUpdateEmployeeDetails');
                if (req.body.EmpId != null) {
                    console.log('EmpId');
                        request1 = new Request("exec sp_AllotLeaves @EmpId", function (err1, rowC, rws) {
                            console.log('sp_AllotLeaves');
                            if (err1) {
                                console.log(err1);
                            } else {
                                console.log('sp_AllotLeaves1');
                            }

                        });
                        console.log('sp_AllotLeaves');
                        request1.addParameter('EmpId', TYPES.Int, req.body.EmpId);
        connection.execSql(request1);
                   // });
                }
            }
            res.json({
                type: true,
                data: 'Profile Updated'
            });
        });
        console.log(req.body);

        request.addParameter('Id', TYPES.BigInt, req.body.Id);
        request.addParameter('UserEmail', TYPES.NVarChar, req.body.UserEmail);
        request.addParameter('EmpId', TYPES.VarChar, req.body.EmpId);
        request.addParameter('FirstName', TYPES.NVarChar, req.body.FirstName);
        request.addParameter('LastName', TYPES.NVarChar, req.body.LastName);
        request.addParameter('Team', TYPES.NVarChar, req.body.Team);
        request.addParameter('Designation', TYPES.NVarChar, req.body.Designation);

        request.addParameter('Gender', TYPES.NVarChar, req.body.Gender);
        request.addParameter('MaritalStatus', TYPES.NVarChar, req.body.MaritalStatus);
        request.addParameter('Children1', TYPES.NVarChar, req.body.Children1);
        request.addParameter('Children2', TYPES.NVarChar, req.body.Children2);
        request.addParameter('CurrentAddress', TYPES.NVarChar, req.body.CurrentAddress);
        request.addParameter('PermanentAddress', TYPES.NVarChar, req.body.PermanentAddress);
        request.addParameter('PersonalEmail', TYPES.NVarChar, req.body.PersonalEmail);
        request.addParameter('ContactNo', TYPES.NVarChar, req.body.ContactNo);
        request.addParameter('EmergencyContactNo', TYPES.NVarChar, req.body.EmergencyContactNo);
        request.addParameter('NameOfEC', TYPES.NVarChar, req.body.NameOfEC);
        request.addParameter('RelationWithEC', TYPES.NVarChar, req.body.RelationWithEC);
        request.addParameter('BloodGroup', TYPES.NVarChar, req.body.BloodGroup);
        request.addParameter('DOJ', TYPES.Date, req.body.DOJ);
        request.addParameter('DOB', TYPES.Date, req.body.DOB);
        request.addParameter('Nominee', TYPES.NVarChar, req.body.Nominee);
        request.addParameter('RelationWithNominee', TYPES.NVarChar, req.body.RelationWithNominee);
        request.addParameter('SkypeID', TYPES.NVarChar, req.body.SkypeID);
        request.addParameter('PassportNumber', TYPES.NVarChar, req.body.PassportNumber);
        request.addParameter('PassportIssueDate', TYPES.Date, req.body.PassportIssueDate);
        request.addParameter('PassportExpiryDate', TYPES.Date, req.body.PassportExpiryDate);
        request.addParameter('PassportIssuePlace', TYPES.NVarChar, req.body.PassportIssuePlace);
        request.addParameter('PanCard', TYPES.NVarChar, req.body.PanCard);
        request.addParameter('BankAccountNumber', TYPES.NVarChar, req.body.BankAccountNumber);
        request.addParameter('ReportingHead', TYPES.NVarChar, req.body.ReportingHead);
        request.addParameter('PFNo', TYPES.NVarChar, req.body.PFNo);
        request.addParameter('UAN', TYPES.NVarChar, req.body.UAN);
        request.addParameter('ProfileStatus', TYPES.Int, req.body.ProfileStatus);
        request.addParameter('ownVisa', TYPES.Bit, req.body.ownVisa);
        request.addParameter('visaCountry', TYPES.NVarChar, req.body.visaCountry);
        request.addParameter('visaExpiryDate', TYPES.Date, req.body.visaExpiryDate);



        connection.execSql(request);
    }


    /*sql.open(sqlConfig, function (err, conn) {
    var tableObjectValue = new Array(req.body.Id, req.body.UserEmail, req.body.EmpId, req.body.FirstName, req.body.LastName, req.body.Team, req.body.Designation, req.body.Gender, req.body.MaritalStatus, req.body.Children1, req.body.Children2, req.body.CurrentAddress, req.body.PermanentAddress, req.body.PersonalEmail, req.body.ContactNo, req.body.EmergencyContactNo, req.body.NameOfEC, req.body.RelationWithEC, req.body.BloodGroup, req.body.DOJ, req.body.DOB, req.body.Nominee, req.body.RelationWithNominee, req.body.SkypeID, req.body.PassportNumber, req.body.PassportIssueDate, req.body.PassportExpiryDate, req.body.PassportIssuePlace, req.body.PanCard, req.body.BankAccountNumber, req.body.ReportingHead, req.body.PFNo, req.body.UAN, req.body.ProfileStatus, req.body.ownVisa, req.body.visaCountry, req.body.visaExpiryDate);
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
            if (req.body.EmpId != null) {

                sql.open(sqlConfig, function (err, conn) {
                    var parms = new Array(req.body.EmpId, "");

                    var pm = conn.procedureMgr();
                    pm.callproc('sp_AllotLeaves', parms, function (err, result, output) {

                        if (err) {
                            console.log(err);
                        } else {
                            console.log('sp_AllotLeaves');
                            // res.json({
                            //       type: true,
                            // data: 'Leaves Alloted'
                            //  });
                            // console.log(res);
                        }
                    });
                });
            }
        }
    });
});*/
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