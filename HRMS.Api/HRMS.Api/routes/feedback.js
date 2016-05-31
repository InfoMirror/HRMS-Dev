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

router.post('/sendMail', function (req, res) {
   
    // Not the movie transporter!
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'mahendra@infoobjects.com', // Your email id
            pass: 'm@nish705' // Your password
        }
    });
    var mailOptions={
        from:'example@gmail.com',
             to:req.body.to,
                  subject:req.body.subject,
                   text:req.body.text
    }
sendEmail(mailOptions);
});

 function sendEmail() {
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
module.exports = router;