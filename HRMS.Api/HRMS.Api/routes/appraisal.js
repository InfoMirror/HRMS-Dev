var nodemailer = require('nodemailer');
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
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
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
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
        request.addParameter('appraisal_month', TYPES.VarChar, req.body.apprMonth);
        request.addParameter('appraisal_year', TYPES.VarChar, req.body.apprYear);
        request.addParameter('status', TYPES.VarChar, req.body.status);
        
        connection.execSql(request);
    }
});

router.post('/updateAppraisalStatus', function (req, res) {
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
      request = new Request("exec sp_updateAppraisalStatus  @userId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_updateAppraisalInfo');
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });

        request.addParameter('userId', TYPES.VarChar, req.body.userId);
        connection.execSql(request);
    }
});



router.post('/submitAppraisalForm', function (req, res) {
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
      request = new Request("exec sp_InsertAppraisalFormStatus  @user_id, @Status, @Role", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_InsertAppraisalFormStatus');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
                }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
        request.addParameter('Status', TYPES.VarChar, req.body.status);
        request.addParameter('Role', TYPES.VarChar, req.body.Role);
        connection.execSql(request);
    }
});

router.post('/submitAppraisalRating', function (req, res) {
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
      request = new Request("exec sp_InsertAppraisalFormRating  @user_id,@Role, @quesId, @ratings, @comments", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_InsertAppraisalFormRating');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
                }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
        request.addParameter('Role', TYPES.VarChar, req.body.Role);
        request.addParameter('quesId', TYPES.VarChar, req.body.quesId);
        request.addParameter('ratings', TYPES.VarChar, req.body.ratings);
        request.addParameter('comments', TYPES.VarChar, req.body.comments);
        connection.execSql(request);
    }
});

router.post('/getCommentAndRating', function (req, res) {
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
      request = new Request("exec sp_getCommentAndRating @user_id, @Role", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getCommentAndRating');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
        request.addParameter('Role', TYPES.VarChar, req.body.Role);
        
        connection.execSql(request);
    } 

});



router.post('/getAllPendingAppraisals', function (req, res) {
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
      request = new Request("exec sp_GetAllPendingAppraisals", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('getAllPendingAppraisals');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
                }
        });

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
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
                }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
        connection.execSql(request);
    }
});

router.post('/getAppraisalQues', function (req, res) {
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
      request = new Request("exec sp_getEmployeeAppraisalQues  @isTrainee, @isActive, @archieved", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getEmployeeAppraisalQues');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });

        request.addParameter('isTrainee', TYPES.VarChar, req.body.Trainee);
          request.addParameter('isActive', TYPES.VarChar, req.body.IsActive);
          request.addParameter('archieved', TYPES.VarChar, req.body.Archieved);
        connection.execSql(request);
    }
});

router.post('/getAllCommentsAndRatings', function (req, res) {
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
      request = new Request("exec sp_getAllCommentsAndRatings @user_id", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getAllCommentsAndRatings');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
        request.addParameter('appr_year', TYPES.VarChar, req.body.apprYear);
        
        
        connection.execSql(request);
    } 

});

router.post('/getAppraisalStatus', function (req, res) {
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
      request = new Request("exec sp_getAppraisalStatus @user_id, @Role", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getAppraisalStatus');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.userId);
         request.addParameter('Role', TYPES.VarChar, req.body.Role);
        
        connection.execSql(request);
    } 

});

router.post('/getEmpProfile', function (req, res) {
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
      request = new Request("exec sp_GetEmployeeProfile @user_id", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetEmployeeProfile');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.user_id);
        
        connection.execSql(request);
    } 

});

router.post('/getEmployeeAppraisalStatus', function (req, res) {
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
      request = new Request("exec sp_getEmployeeAppraisalStatus @user_id", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getEmployeeAppraisalStatus');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });

        request.addParameter('user_id', TYPES.VarChar, req.body.user_id);
        
        connection.execSql(request);
    } 

});
router.post('/getArchievedAppraisals', function (req, res) {
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
      request = new Request("exec sp_getArchievedAppraisals", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_getArchievedAppraisals');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });

        connection.execSql(request);
    } 

});

router.post('/addAppraisalQuestion', function (req, res) {
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
      request = new Request("exec sp_addAppraisalQuestion @quesDescription,@quesType,@isActive,@isTrainee,@weightage", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_addAppraisalQuestion');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });


       request.addParameter('quesDescription', TYPES.VarChar, req.body.quesDescription);
       request.addParameter('quesType', TYPES.VarChar, req.body.questype);
       request.addParameter('isActive', TYPES.VarChar, req.body.isActive);
       request.addParameter('isTrainee', TYPES.VarChar, req.body.isTrainee);
       request.addParameter('weightage', TYPES.VarChar, req.body.weightage);

        connection.execSql(request);
    } 

});



router.post('/updateQuesList', function (req, res) {
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
      request = new Request("exec sp_updateQuesList @quesList", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_updateQuesList');
                console.log(rowCount);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();
            }
        });


       request.addParameter('quesList', TYPES.VarChar, req.body.quesList);

        connection.execSql(request);
    } 

});



module.exports = router;