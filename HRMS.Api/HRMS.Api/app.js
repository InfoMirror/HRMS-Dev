var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sql = require('msnodesqlv8');
var http = require('http');
var path = require('path');
var multer = require('multer');
var fs = require("fs");
var xlsx = require('node-xlsx');
var compression = require('compression')

var routes = require('./routes/index');
var authenticate = require('./routes/authentication.js');
var leave = require('./routes/leave.js');
var profile = require('./routes/profile.js');

var adminattendance = require('./routes/adminattendance.js');

var dashboard = require('./routes/dashboard.js');

var approval = require('./routes/approvalCompOffOD.js');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(compression())
app.use('/', routes);
app.use('/account', authenticate);
app.use('/leave', leave);

app.use('/admin', adminattendance);

app.use('/dashboard', dashboard);
app.use('/profile', profile);

app.use('/approval',approval);

app.set('port', process.env.PORT || 9095);

//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

app.get("/index.html", function (req, res) {
    res.sendfile("views/index.html");
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});