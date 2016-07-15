var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
//var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');
var connectionConfig = require('../config/sqlConfig.json');
var sqlConnection = require('tedious').Connection;
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}
    

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

router.post('/submitFeedback', function (req, res) {
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
        request = new Request("exec sp_InsertAnonymousFeedback @FeedbackId, @Subject, @Description, @Resolve ", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_InsertAnonymousFeedback');
                //console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                    sendEmail(mailOptions);
                    connection.close();

                }
            }
        });
        request.addParameter('FeedbackId', TYPES.VarChar, req.body.feedbackId);
        request.addParameter('Subject', TYPES.VarChar, encrypt(req.body.feedback.subject));
        request.addParameter('Description', TYPES.VarChar, encrypt(req.body.feedback.description));
        request.addParameter('Resolve', TYPES.VarChar, 0);
        //request.addParameter('FeedbackDateTime', TYPES.DateTime, new Date());
        connection.execSql(request);
    }

    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hrms.infoobjects@gmail.com', // Your email id
            pass: 'hrms@infoobjects' // Your password
        }
    });
    var conversationUrl = 'http://localhost:55555/#/FeedbackConversation/';
    var text = "Please click below link to view your feedback - \n " + "<a href='" + conversationUrl + req.body.feedbackId + "'></a>";
    var mailOptions = {
        to: req.body.feedback.email + ',divya@infoobjects.com',
        subject: 'Feedback submitted: ' + req.body.feedback.subject,
        text: text
    }
    function sendEmail(mailOptions) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Message sent: ' + info.response);
            };
        });
    }
});

router.post('/getFeedbacks', function (req, res) {
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
        request = new Request("exec sp_GetAllAnonymousFeedback @FeedbackId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetAllAnonymousFeedback');
                console.log(rowCount);
                if (rows.length > 0) {
                    for(i=0;i<rows.length;i++)
                    {
                        rows[i].Subject.value = decrypt(rows[i].Subject.value);
                        rows[i].Description.value = decrypt(rows[i].Description.value); 
                    }
                    //rows[0].Subject.value = decrypt(rows[0].Subject.value);
                    //rows[0].Description.value = decrypt(rows[0].Description.value);
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();

                }
            }
        });
        if (req.body.feedbackId!=undefined) {
            request.addParameter('FeedbackId', TYPES.VarChar, req.body.feedbackId);
        }
        else {
            request.addParameter('FeedbackId', TYPES.VarChar, null);
        }
        connection.execSql(request);
    }
});

router.post('/getConversationData', function (req, res) {
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
        request = new Request("exec sp_GetConversationData @FeedbackId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_GetConversationData');
                console.log(rowCount);
                if (rows.length > 0) {
                    for(i=0;i<rows.length;i++)
                    {
                        rows[i].Comment.value = decrypt(rows[i].Comment.value);
                    }
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();

                }
            }
        });
        request.addParameter('FeedbackId', TYPES.VarChar, req.body.feedbackId);
        connection.execSql(request);
    }
});

router.post('/insertConversationData', function (req, res) {
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
        request = new Request("exec sp_InsertConversationData @FeedbackId, @Username, @Comment ", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_InsertConversationData');
                //console.log(rows);
                if (rowCount > 0) {
                    res.json({
                        type: true,
                        data: rows
                    });
                    connection.close();

                }
            }
        });
        request.addParameter('FeedbackId', TYPES.VarChar, req.body.feedbackId);
        request.addParameter('Username', TYPES.VarChar, req.body.username);
        request.addParameter('Comment', TYPES.VarChar, encrypt(req.body.comment));
       // request.addParameter('CommentDateTime', TYPES.DateTime,);
        connection.execSql(request);
    }
});

router.post('/updateAnonymousFeedback', function (req, res) {
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
        request = new Request("exec sp_UpdateAnonymousFeedback @FeedbackId, @Resolve", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
                console.log('sp_UpdateAnonymousFeedback');
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
        request.addParameter('FeedbackId', TYPES.VarChar, req.body.feedbackId);
        request.addParameter('Resolve', TYPES.VarChar, req.body.resolve);
        connection.execSql(request);
    }
});


module.exports = router;