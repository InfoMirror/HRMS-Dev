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

router.post('/login', function (req, res) {
    console.log('config: ', config)
    var connection = new sqlConnection(config);
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

    console.log('In NodeJS Service');

    function executeStatement() {
        request = new Request("exec sp_SelectDeleteLogin @Action, @Email, @UserId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log("sp_SelectDeleteLogin");
                console.log(rows);
                console.log(rowCount);
                if (rowCount > 0) {
                    request1 = new Request("exec sp_SelectDeleteEmployeeDetails @Action, @UserEmail", function (err, rowCount, rows) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("sp_SelectDeleteEmployeeDetails");
                            console.log(rows);
                            res.json({
                                type: true,
                                data: rows
                            });
                        }
                    });

                    request1.addParameter('Action', TYPES.VarChar, "SelectByEmail");
                    request1.addParameter('UserEmail', TYPES.VarChar, req.body.email);

                    connection.execSql(request1);

                } else {
                    request2 = new Request("exec Sp_InsertLogin @Email", function (err, rowCount, rows) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log('Sp_InsertLogin');
                            console.log(rows);
                            reqEmpDetailsInsert = new Request("exec sp_InsertUpdateEmployeeDetails @Id,@UserEmail,@EmpId,@FirstName,@LastName,@Team,@Designation,@Gender,@MaritalStatus,@Children1,@Children2,@CurrentAddress,@PermanentAddress,@PersonalEmail,@ContactNo,@EmergencyContactNo,@NameOfEC,@RelationWithEC,@BloodGroup,@DOJ,@DOB,@Nominee,@RelationWithNominee,@SkypeID,@ownPassport,@PassportNumber,@PassportIssueDate,@PassportExpiryDate,@PassportIssuePlace,@PanCard,@BankAccountNumber,@ReportingHead,@PFNo,@UAN,@ProfileStatus,@ownVisa,@visaCountry,@visaExpiryDate,@IsActive,@Role", function (err, rowCount, rows) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('sp_InsertUpdateEmployeeDetails');
                                    reqGettingEmpDetails = new Request("exec sp_SelectDeleteEmployeeDetails @Action, @UserEmail", function (err, rowCount, rows) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                            console.log('sp_SelectDeleteEmployeeDetails');
                                            console.log(rows);
                                            res.json({
                                                type: true,
                                                data: rows
                                            });
                                        }
                                    });

                                    reqGettingEmpDetails.addParameter('Action', TYPES.NVarChar, "SelectByEmail");
                                    reqGettingEmpDetails.addParameter('UserEmail', TYPES.NVarChar, req.body.email);

                                    connection.execSql(reqGettingEmpDetails);
                                }
                            });

                            reqEmpDetailsInsert.addParameter('Id', TYPES.BigInt, "0");
                            reqEmpDetailsInsert.addParameter('UserEmail', TYPES.NVarChar, req.body.email);
                            reqEmpDetailsInsert.addParameter('EmpId', TYPES.VarChar, null);
                            reqEmpDetailsInsert.addParameter('FirstName', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('LastName', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('Team', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('Designation', TYPES.NVarChar, null);

                            reqEmpDetailsInsert.addParameter('Gender', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('MaritalStatus', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('Children1', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('Children2', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('CurrentAddress', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('PermanentAddress', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('PersonalEmail', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('ContactNo', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('EmergencyContactNo', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('NameOfEC', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('RelationWithEC', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('BloodGroup', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('DOJ', TYPES.Date, null);
                            reqEmpDetailsInsert.addParameter('DOB', TYPES.Date, null);
                            reqEmpDetailsInsert.addParameter('Nominee', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('RelationWithNominee', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('SkypeID', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('ownPassport', TYPES.Bit, null);
                            reqEmpDetailsInsert.addParameter('PassportNumber', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('PassportIssueDate', TYPES.Date, null);
                            reqEmpDetailsInsert.addParameter('PassportExpiryDate', TYPES.Date, null);
                            reqEmpDetailsInsert.addParameter('PassportIssuePlace', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('PanCard', TYPES.NVarChar, req.body.PanCard);
                            reqEmpDetailsInsert.addParameter('BankAccountNumber', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('ReportingHead', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('PFNo', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('UAN', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('ProfileStatus', TYPES.Int, "22");
                            reqEmpDetailsInsert.addParameter('ownVisa', TYPES.Bit, null);
                            reqEmpDetailsInsert.addParameter('visaCountry', TYPES.NVarChar, null);
                            reqEmpDetailsInsert.addParameter('visaExpiryDate', TYPES.Date, null);
                             reqEmpDetailsInsert.addParameter('IsActive', TYPES.Bit, 1);
                            reqEmpDetailsInsert.addParameter('Role', TYPES.VarChar, "Employee");
                            //reqEmpDetailsInsert.addParameter('ImageUrl', TYPES.NVarChar, req.body.image);

                            connection.execSql(reqEmpDetailsInsert);
                        }
                    });

                    request2.addParameter('Email', TYPES.NVarChar, req.body.email);
                    connection.execSql(request2);
                }
            }
        });

        request.addParameter('Action', TYPES.NVarChar, "SelectByUserName");
        request.addParameter('Email', TYPES.NVarChar, req.body.email);
        request.addParameter('UserId', TYPES.NVarChar, "");

        connection.execSql(request);
    }
    // console.log(req.body);

});



function insertupdateuser(userid, email) {
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
        request = new Request("exec sp_InsertUpdateLogin @UserId, @Email", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_InsertUpdateLogin');
                console.log(rows);
            }
        });

        request.addParameter('UserId', TYPES.NVarChar, userid);
        request.addParameter('Email', TYPES.NVarChar, email);
        connection.execSql(request);
    } 
}
var empData = [];

function selectEmployeeDetails(email) {
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
                empData = rows;
                return empData;
            }
        });

        request.addParameter('Action', TYPES.VarChar, "SelectByEmail");
        request.addParameter('UserEmail', TYPES.VarChar, email);
        connection.execSql(request);
    }
}

function InsertEmployeeDetails(email) {
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
        reqEmpDetailsInsert = new Request("exec sp_InsertUpdateEmployeeDetails @Id, @UserEmail, @EmpId, @FirstName, @LastName, @Team, @Designation, @Gender, @MaritalStatus, @Children1, @Children2, @CurrentAddress, @PermanentAddress, @PersonalEmail, @ContactNo, @EmergencyContactNo, @NameOfEC, @RelationWithEC, @BloodGroup, @DOJ, @DOB, @Nominee, @RelationWithNominee, @SkypeID,@ownPassport, @PassportNumber, @PassportIssueDate, @PassportExpiryDate, @PassportIssuePlace, @PanCard, @BankAccountNumber, @ReportingHead, @PFNo, @UAN, @ProfileStatus, @ownVisa, @visaCountry, @visaExpiryDate,IsActive, @Role", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetCompOffByEmployeeId');
                console.log(rows);
            }
        });

        reqEmpDetailsInsert.addParameter('Id', TYPES.BigInt, "0");
        reqEmpDetailsInsert.addParameter('UserEmail', TYPES.NVarChar, req.body.email);
        reqEmpDetailsInsert.addParameter('EmpId', TYPES.VarChar, null);
        reqEmpDetailsInsert.addParameter('FirstName', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('LastName', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('Team', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('Designation', TYPES.NVarChar, null);

        reqEmpDetailsInsert.addParameter('Gender', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('MaritalStatus', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('Children1', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('Children2', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('CurrentAddress', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('PermanentAddress', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('PersonalEmail', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('ContactNo', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('EmergencyContactNo', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('NameOfEC', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('RelationWithEC', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('BloodGroup', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('DOJ', TYPES.Date, null);
        reqEmpDetailsInsert.addParameter('DOB', TYPES.Date, null);
        reqEmpDetailsInsert.addParameter('Nominee', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('RelationWithNominee', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('SkypeID', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('ownPassport', TYPES.Bit, null);
        reqEmpDetailsInsert.addParameter('PassportNumber', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('PassportIssueDate', TYPES.Date, null);
        reqEmpDetailsInsert.addParameter('PassportExpiryDate', TYPES.Date, null);
        reqEmpDetailsInsert.addParameter('PassportIssuePlace', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('PanCard', TYPES.NVarChar, req.body.PanCard);
        reqEmpDetailsInsert.addParameter('BankAccountNumber', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('ReportingHead', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('PFNo', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('UAN', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('ProfileStatus', TYPES.Int, "22");
        reqEmpDetailsInsert.addParameter('ownVisa', TYPES.Bit, null);
        reqEmpDetailsInsert.addParameter('visaCountry', TYPES.NVarChar, null);
        reqEmpDetailsInsert.addParameter('visaExpiryDate', TYPES.Date, null);
         reqEmpDetailsInsert.addParameter('IsActive', TYPES.Bit, 1);
        reqEmpDetailsInsert.addParameter('Role', TYPES.VarChar, "Employee");

        connection.execSql(reqEmpDetailsInsert);
    } 
}
module.exports = router;