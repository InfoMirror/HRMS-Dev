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
        useColumnNames: true
    }
};

router.post('/addAppraisalInfo', function (req, res) {
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
      request = new Request("exec sp_InsertAppraisalInfo  @user_id, @appraisal_month, @appraisal_year, @isAppraisal, @status", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_InsertAppraisalInfo');
                console.log(rowCount);
                if (rows.length > 0 || rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
                }
            }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
        request.addParameter('appraisal_month', TYPES.VarChar, req.body.apprMonth);
        request.addParameter('appraisal_year', TYPES.VarChar, req.body.apprYear);
        request.addParameter('isAppraisal', TYPES.VarChar, req.body.isAppraisal);
        request.addParameter('status', TYPES.VarChar, req.body.status);
        
        connection.execSql(request);
    }


    

});

router.post('/updateAppraisalInfo', function (req, res) {
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
      request = new Request("exec sp_updateAppraisalInfo  @user_id, @appraisal_month, @appraisal_year, @status", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_updateAppraisalInfo');
                if (rows.length > 0 || rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
                }
            }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
        request.addParameter('appraisal_month', TYPES.VarChar, req.body.apprMonth);
        request.addParameter('appraisal_year', TYPES.VarChar, req.body.apprYear);
        request.addParameter('status', TYPES.VarChar, req.body.status);
        
        connection.execSql(request);
    }


    

});

router.post('/getAppraisal', function (req, res) {
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
      request = new Request("exec sp_getAppraisalInfo  @user_id", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getAppraisalInfo');
                console.log(rowCount);
                //if (rows.length > 0 || rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
                }
            //}
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
        connection.execSql(request);
    }
});


// Not the movie transporter!

module.exports = router;