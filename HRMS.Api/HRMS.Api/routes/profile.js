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
/*var config = {
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
};*/
router.get('/getAllRelations', function (req, res) {
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
        request = new Request("exec sp_GetAllRelations", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetAllRelations');
                console.log(rows);
                if (rowCount > 0) {
                    connection.close(); 
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

router.get('/getAllEmployees', function (req, res) {
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
        request = new Request("exec sp_GetAllEpmloyees", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetAllEpmloyees');
                console.log(rows);
                if (rowCount > 0) {
                    connection.close(); 
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

router.post('/getReportingHeadByEmpId', function (req, res) {
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
        request = new Request("exec sp_getReportingHeadByEmpId @EmpId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getReportingHeadByEmpId');
                console.log(rows);
                if (rowCount > 0) {
                    connection.close(); 
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });
        request.addParameter('EmpId', TYPES.VarChar, req.body.EmpId);
        connection.execSql(request);
    }
});


router.get('/getDeactivatedEmployees', function (req, res) {
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
        request = new Request("exec sp_GetDeactivatedEmployees", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetDeactivatedEmployees');
                console.log(rows);
                if (rowCount > 0) {
                    connection.close(); 
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

router.get('/getAllEmployeesData', function (req, res) {
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
        request = new Request("exec sp_GetAllEpmloyees", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                // console.log('sp_GetAllEpmloyees');
                // console.log(rows);
                if (rowCount > 0) {
                    for (var i = 0; i < rowCount; i++) {
                        rows[i].Id = rows[i].Id.value;
                        rows[i].Name = rows[i].Name.value;
                        rows[i].UserEmail = rows[i].UserEmail.value;
                        rows[i].Team = rows[i].Team.value;
                        rows[i].ImageUrl = rows[i].ImageUrl.value;
                    }
                    connection.close(); 
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
        pm.callproc('sp_GetAllEpmloyees', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error: ');
                console.log(err);
            } else {
                if (results.length > 0) {
                    console.log(results);
                    connection.close();                     
                    res.json({
                        type: true,
                        data: results
                    });
                }
            }
        });
    });*/
});

router.post('/getMasterValues', function (req, res) {
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
        request = new Request("exec sp_SelectMasterValue @MasterTypeId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_SelectMasterValue');
                console.log(rows);
                if (rowCount > 0) {
                    connection.close(); 
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        request.addParameter('MasterTypeId', TYPES.VarChar, req.body.MasterTypeId);

        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.MasterTypeId, "");
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_SelectMasterValue', tableObjectValue, function (err, results, output) {
            console.log('sp_SelectMasterValue');
            console.log(results);
            if (err) {
                console.log(err);
            } else {
                if (results.length > 0) {

                    connection.close();                     
                    res.json({
                        type: true,
                        data: results
                    });
                }
            }
        });
    });*/
});

router.post('/updateEmployeeDetails', function (req, res) {
    console.log("Request", req)
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

    function executeStatement() {

        request = new Request("exec sp_InsertUpdateEmployeeDetails @Id,@CreatedDate,@CreatedBy,@ModifiedDate,@ModifiedBy,@UserEmail,@EmpId,@FirstName,@LastName,@Team,@Designation,@Gender,@MaritalStatus,@Children1,@Children2,@CurrentAddress,@PermanentAddress,@PersonalEmail,@ContactNo,@EmergencyContactNo,@NameOfEC,@RelationWithEC,@BloodGroup,@DOJ,@DOB,@Nominee,@RelationWithNominee,@SkypeID,@ownPassport,@PassportNumber,@PassportIssueDate,@PassportExpiryDate,@PassportIssuePlace,@PanCard,@BankAccountNumber,@ReportingHead,@PFNo,@UAN,@ProfileStatus,@ownVisa,@visaCountry,@visaExpiryDate,@IsActive,@Role", function (err, rowCount, rows) {
            if (err) {
                console.log("Error in updating details", err);
                connection.close(); 
                res.json({
                    type: true,
                    data: 'Profile Updation Failed'
                });

            } else {
                console.log('sp_InsertUpdateEmployeeDetails');
                connection.close(); 
                res.json({
                    type: true,
                    data: 'Profile Updated'
                });
            }
        });
        console.log(req.body);

        request.addParameter('Id', TYPES.BigInt, req.body.Id.value);
        request.addParameter('CreatedDate', TYPES.Date, req.body.CreatedDate.value);
        request.addParameter('CreatedBy', TYPES.NVarChar, req.body.CreatedBy.value);
        request.addParameter('ModifiedDate', TYPES.Date, new Date());
        request.addParameter('ModifiedBy', TYPES.NVarChar, req.body.ModifiedBy.value);
        request.addParameter('UserEmail', TYPES.NVarChar, req.body.UserEmail.value);
        request.addParameter('EmpId', TYPES.VarChar, req.body.EmpId.value);
        request.addParameter('FirstName', TYPES.NVarChar, req.body.FirstName.value);
        request.addParameter('LastName', TYPES.NVarChar, req.body.LastName.value);
        request.addParameter('Team', TYPES.NVarChar, req.body.Team.value);
        request.addParameter('Designation', TYPES.NVarChar, req.body.Designation.value);
        request.addParameter('Gender', TYPES.NVarChar, req.body.Gender.value);
        request.addParameter('MaritalStatus', TYPES.NVarChar, req.body.MaritalStatus.value);
        request.addParameter('Children1', TYPES.NVarChar, req.body.Children1.value);
        request.addParameter('Children2', TYPES.NVarChar, req.body.Children2.value);
        request.addParameter('CurrentAddress', TYPES.NVarChar, req.body.CurrentAddress.value);
        request.addParameter('PermanentAddress', TYPES.NVarChar, req.body.PermanentAddress.value);
        request.addParameter('PersonalEmail', TYPES.NVarChar, req.body.PersonalEmail.value);
        request.addParameter('ContactNo', TYPES.NVarChar, req.body.ContactNo.value);
        request.addParameter('EmergencyContactNo', TYPES.NVarChar, req.body.EmergencyContactNo.value);
        request.addParameter('NameOfEC', TYPES.NVarChar, req.body.NameOfEC.value);
        request.addParameter('RelationWithEC', TYPES.NVarChar, req.body.RelationWithEC.value);
        request.addParameter('BloodGroup', TYPES.NVarChar, req.body.BloodGroup.value);
        request.addParameter('DOJ', TYPES.Date, req.body.DOJ.value);
        request.addParameter('DOB', TYPES.Date, req.body.DOB.value);
        request.addParameter('Nominee', TYPES.NVarChar, req.body.Nominee.value);
        request.addParameter('RelationWithNominee', TYPES.NVarChar, req.body.RelationWithNominee.value);
        request.addParameter('SkypeID', TYPES.NVarChar, req.body.SkypeID.value);
        request.addParameter('ownPassport', TYPES.Bit, req.body.ownPassport.value);
        request.addParameter('PassportNumber', TYPES.NVarChar, req.body.PassportNumber.value);
        request.addParameter('PassportIssueDate', TYPES.Date, req.body.PassportIssueDate.value);
        request.addParameter('PassportExpiryDate', TYPES.Date, req.body.PassportExpiryDate.value);
        request.addParameter('PassportIssuePlace', TYPES.NVarChar, req.body.PassportIssuePlace.value);
        request.addParameter('PanCard', TYPES.NVarChar, req.body.PanCard.value);
        request.addParameter('BankAccountNumber', TYPES.NVarChar, req.body.BankAccountNumber.value);
        request.addParameter('ReportingHead', TYPES.NVarChar, req.body.ReportingHead.value);
        request.addParameter('PFNo', TYPES.NVarChar, req.body.PFNo.value);
        request.addParameter('UAN', TYPES.NVarChar, req.body.UAN.value);
        request.addParameter('ProfileStatus', TYPES.Int, req.body.ProfileStatus.value);
        request.addParameter('ownVisa', TYPES.Bit, req.body.ownVisa.value);
        request.addParameter('visaCountry', TYPES.NVarChar, req.body.visaCountry.value);
        request.addParameter('visaExpiryDate', TYPES.Date, req.body.visaExpiryDate.value);
        request.addParameter('IsActive', TYPES.Bit, req.body.IsActive.value);
        request.addParameter('Role', TYPES.VarChar, req.body.Role.value);



        connection.execSql(request);
    }

});

router.post('/updateEmployeeIsActive', function (req, res) {
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
        request = new Request("exec sp_UpdateIsActive @EmpId, @IsActive", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_UpdateIsActive');
                console.log(rows);
                if (rowCount > 0) {
                    connection.close();
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });
        request.addParameter('EmpId', TYPES.NVarChar, req.body.EmpId);
        request.addParameter('IsActive', TYPES.Bit, req.body.IsActive);
        connection.execSql(request);
    }

});


router.get('/getEmpDetails', function (req, res) {
    console.log(req.query)
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
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
                    connection.close();
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });
        request.addParameter('Action', TYPES.VarChar, "SelectByEmail");
        request.addParameter('UserEmail', TYPES.VarChar, req.query.UserEmail);
        connection.execSql(request);
    }
    /*sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array('SelectByEmail', req.body.UserEmail, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_SelectDeleteEmployeeDetails', tableObjectValue, function (err, results, output) {
            console.log('sp_SelectDeleteEmployeeDetails');
            console.log(results);
            if (err) {
                console.log(err);
            } else {
                if (results.length > 0) {
                    connection.close();                     
                    res.json({
                        type: true,
                        data: results
                    });
                }
            }
        });
    });*/
});

router.post('/getApprovalReqEmp', function (req, res) {
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        executeStatement();
    });

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec sp_GetApprovalReqEmp", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetApprovalReqEmp');
                console.log(rows);
                if (rowCount > 0) {
                    connection.close(); 
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
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetApprovalReqEmp', tableObjectValue, function (err, results, output) {
            console.log(results);
            if (err) {
                console.log(err);
            } else {
                if (results.length > 0) {
                    connection.close();                     
                    res.json({
                        type: true,
                        data: results
                    });
                }
            }
        });
    });*/
});

router.post('/IsEmpIdExist', function (req, res) {
    console.log('sp_IsEmpIdExist');
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        executeStatement();
    });

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec sp_IsEmpIdExist @EmpId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_IsEmpIdExist');
                console.log(rows);
                if (rowCount > 0) {
                    connection.close(); 
                    res.json({
                        type: true,
                        data: rows
                    });
                } else {
                    connection.close(); 
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        request.addParameter('EmpId', TYPES.NVarChar, req.body.EmpId.value);

        connection.execSql(request);
    }
});

router.post('/updateEmpId', function (req, res) {
    console.log('sp_UpdateEmpId');
    var connection = new sqlConnection(config);
    connection.on('connect', function (err) {
        if (err) {
            return console.error(err);
        }
        executeStatement();
    });

    var Request = require('tedious').Request;
    var TYPES = require('tedious').TYPES;

    function executeStatement() {
        request = new Request("exec sp_UpdateEmpId @UserEmail, @EmpId", function (err, rowCount, rows) {
            debugger;
            if (err) {
                console.log(err);
            } else {
                console.log('sp_UpdateEmpId');
                console.log(rows);
                if (rowCount > 0) {
                    connection.close(); 
                    res.json({
                        type: true,
                        data: rows
                    });
                } else {
                    connection.close(); 
                    res.json({
                        type: true,
                        data: rows
                    });
                }
            }
        });

        request.addParameter('UserEmail', TYPES.VarChar, req.body.UserEmail);
        request.addParameter('EmpId', TYPES.VarChar, req.body.EmpId.value);

        connection.execSql(request);
    }
});

module.exports = router;