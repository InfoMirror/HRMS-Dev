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
        port:'49172'
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
    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;
    connection.on('connect', function(err) {
                                         request = new Request("exec sp_SelectDeleteEmployeeDetails @Action,@UserEmail",function(err,rowC,rws){
                                            if(err){
                                                console.log(err);
                                            }else{
                                                console.log('done1'); 
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
                                      
                                     request.addParameter('Action', TYPES.VarChar,'SelectByEmail'); 
        request.addParameter('UserEmail', TYPES.VarChar,req.body.UserEmail); 
                                      connection.execSql(request);
                                    });
    
    /* connection.on('connect', function(err) {
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

        request = new Request("exec sp_InsertUpdateEmployeeDetails @Id,@UserEmail,@EmpId,@FirstName,@LastName,@Team,@Designation,@Gender,@MaritalStatus,@Children1,@Children2,@CurrentAddress,@PermanentAddress,@PersonalEmail,@ContactNo,@EmergencyContactNo,@NameOfEC,@RelationWithEC,@BloodGroup,@DOJ,@DOB,@Nominee,@RelationWithNominee,@SkypeID,@PassportNumber,@PassportIssueDate,@PassportExpiryDate,@PassportIssuePlace,@PanCard,@BankAccountNumber,@ReportingHead,@PFNo,@UAN,@ProfileStatus,@ownVisa,@visaCountry,@visaExpiryDate", function(err, rowCount, rows) {
            if (err) {
                console.log(err);
            }else{
                if (req.body.EmpId != null) {

                                   connection.on('connect', function(err) {
                                         request = new Request("xec sp_AllotLeaves @EmpId",function(err,rowC,rws){
                                            if(err){
                                                console.log(err);
                                            }else{
                                                console.log(err); 
                                            }
                                             
                                         });
                                      
                                     request.addParameter('EmpId', TYPES.Int,req.body.EmpId); 
                                      
                                    });
                                }
            }
            if (rows) {
                res.send(rows);
                res.end();
            }
        });
        console.log()
        request.addParameter('Id', TYPES.BigInt,req.body.Id); 
        request.addParameter('UserEmail', TYPES.NVarChar,req.body.UserEmail);
          request.addParameter('EmpId', TYPES.VarChar,req.body.EmpId);
          request.addParameter('FirstName', TYPES.NVarChar,0);
          request.addParameter('LastName', TYPES.NVarChar,0);
          request.addParameter('Team', TYPES.NVarChar,0);
          request.addParameter('Designation', TYPES.NVarChar,0);
        
          request.addParameter('Gender', TYPES.NVarChar,0);
          request.addParameter('MaritalStatus', TYPES.NVarChar,0);
          request.addParameter('Children1', TYPES.NVarChar,0);
          request.addParameter('Children2', TYPES.INVarCharnt,0);
          request.addParameter('CurrentAddress', TYPES.NVarChar,0);
          request.addParameter('PermanentAddress', TYPES.NVarChar,0);
          request.addParameter('PersonalEmail', TYPES.NVarChar,0);
          request.addParameter('ContactNo', TYPES.NVarChar,0);
          request.addParameter('EmergencyContactNo', TYPES.NVarChar,0);
          request.addParameter('NameOfEC', TYPES.NVarChar,0);
          request.addParameter('RelationWithEC', TYPES.NVarChar,0);
          request.addParameter('BloodGroup', TYPES.NVarChar,0);
          request.addParameter('DOJ', TYPES.Date,0);
        request.addParameter('DOB', TYPES.Date,0);
        request.addParameter('Nominee', TYPES.NVarChar,0);
        request.addParameter('RelationWithNominee', TYPES.NVarChar,0);
        request.addParameter('SkypeID', TYPES.NVarChar,0);
        request.addParameter('PassportNumber', TYPES.NVarChar,0);
        request.addParameter('PassportIssueDate', TYPES.Date,0);
        request.addParameter('PassportExpiryDate', TYPES.Date,0);
        request.addParameter('PassportIssuePlace', TYPES.nvarchar,0);
        request.addParameter('PanCard', TYPES.nvarchar,0);
        request.addParameter('ReportingHead', TYPES.nvarchar,0);
        request.addParameter('PFNo', TYPES.nvarchar,0);
        request.addParameter('ProfileStatus', TYPES.Int,0);
        request.addParameter('ownVisa', TYPES.Bit,0);
        request.addParameter('visaCountry', TYPES.nvarchar,0);
        request.addParameter('visaExpiryDate', TYPES.Date,0);
        
        
        
        connection.execSql(request);
    }*/

    
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