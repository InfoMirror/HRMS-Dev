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

router.post('/submitFeedback', function (req, res) {
//    var connection = new sqlConnection(config);
//     connection.on('connect', function (err) {
//         if (err) {
//             return console.error(err);
//         }
//         // If no error, then good to proceed.
//         executeStatement();
//     });
//     var Request = require('tedious').Request;
//     var TYPES = require('tedious').TYPES;

//     function executeStatement() {
//         request = new Request("exec sp_InsertAnonymousFeedback @FeedbackId, @Subject, @Description, @Resolve, @FeedbackDateTime ", function (err, rowCount, rows) {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('sp_InsertAnonymousFeedback');
//                 console.log(rows);
//                 if (rowCount > 0) {
//                     res.json({
//                         type: true,
//                         data: rows
//                     });
//                 }
//             }
//         });
//         request.addParameter('FeedbackId', TYPES.VarChar, req.body.feedback.FeedbackId);
//         request.addParameter('Subject', TYPES.VarChar, req.body.feedback.Subject);
//         request.addParameter('Description', TYPES.VarChar, req.body.feedback.Description);
//         request.addParameter('Resolve', TYPES.VarChar, 0);
//         request.addParameter('FeedbackDateTime', TYPES.VarChar, NOW());
//         connection.execSql(request);
//     }
   
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hrms.infoobjects@gmail.com', // Your email id
            pass: 'hrms@infoobjects' // Your password
        }
    });
    var mailOptions={
             to:req.body.feedback.email,
                  subject:req.body.feedback.subject,
                   text:req.body.feedback.description
    }
sendEmail(mailOptions);
 function sendEmail(mailOptions) {
     transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
 }
});


module.exports = router;