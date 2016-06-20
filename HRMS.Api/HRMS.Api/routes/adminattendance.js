var express = require('express');
//var sql = require('msnodesqlv8');
var moment = require('moment');
var sqlConfig = require('../config/sqlConfig.js');
var connectionConfig = require('../config/sqlConfig.json');
var sqlConnection = require('tedious').Connection;
var multer = require('multer');
var router = express.Router();
var fs = require("fs");
var xlsx = require('node-xlsx');
var filename = '';
var fnameorginal = '';
var absentCount = 0;
var HalfabsentCount = 0;

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

var storage = multer.diskStorage({


    //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, 'C:/upload')
    },
    filename: function (req, file, cb) {


        var datetimestamp = Date.now();
        fnameorginal = file.originalname.split('.')[0];

        filename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, filename)
    }

});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

/** API path that will upload the files */
router.post('/uploadMonthly', function (req, res) {
    upload(req, res, function (err) {
        // console.log("uploadss");
        if (err) {
            console.log(err);
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        //console.log(filename);
        excuteexcelmonthly(filename);

        res.json({
            error_code: absentCount,
            err_desc: HalfabsentCount
        });
    })

});


router.post('/upload', function (req, res) {
     console.log("upload");
    //  console.log(file);
    upload(req, res, function (err) {
        //   console.log("uploadss");
        if (err) {
            console.log(err);
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        //console.log(filename);
        excuteexcel(filename);

        isDuplicateDate(getfulldateDailySheet(fnameorginal),function(isduplicate){
           if(isduplicate){
                res.json({
            error_code: 11,
            err_desc: 'Attandance for this date is allready uploaded'
        }); 
           } else{
                 res.json({
            error_code: 0,
            err_desc: ''
        });  
           }
        });
      
        //console.log(res)
    })

});

function excuteexcel(filename) {
    var xlsFile = 'C:/upload/' + filename;

    var date = fnameorginal.substring(0, 2);
    var month = getmonth(fnameorginal.substring(2, 5));
    var year = fnameorginal.substring(6, 10);
    var fulldate = moment(getfulldateDailySheet(fnameorginal),'YYYY-MM-DD');
    var day = fulldate.format('ddd');
    fulldate=getfulldateDailySheet(fnameorginal);
   console.log(day);
    isDuplicateDate(fulldate,0, function (IsDuplicate) {

        if (!IsDuplicate) {
            isHoliDay(fulldate, function (IsHoliday) {

                fs.exists(xlsFile, function (exists) {
                    if (exists) {
                        var obj = xlsx.parse(xlsFile);
                        var len = obj[0].data.length;
                        if (day == 'Sat' || day == 'Sun' || IsHoliday) {
                            console.log('holiday');
                            for (var i = 7; i <= len - 2; i = i + 3) {
                                if (obj[0].data[i + 2] == 'DEPARTMENT: INFOOBJECTS') {
                                    i = i + 2;
                                    continue;
                                }

                                if (obj[0].data[i] == 'undefined') {
                                    console.log(obj[0].data[i])
                                } else {
                                    if (obj[0].data[i][2] == ':' || obj[0].data[i][3] == ':') {

                                    } else {
                                        // var starttm = new Date(year, month, date, obj[0].data[i][2].substring(0, 2), obj[0].data[i][2].substring(3, 5))
                                        // var endtm = new Date(year, month, date, obj[0].data[i][3].substring(0, 2), obj[0].data[i][3].substring(3, 5))
                                        // var hh = Math.floor((endtm - starttm) / 1000 / 60 / 60);
                                        var start=moment(date + '/' + month + '/' + year+' '+obj[0].data[i][2].substring(0, 2)+':'+obj[0].data[i][2].substring(3, 5)+':00');
                                        var end=moment(date + '/' + month + '/' +year+' '+obj[0].data[i][3].substring(0, 2)+':'+obj[0].data[i][3].substring(3, 5)+':00');
                                        var ms = moment(end,"DD/MM/YYYY HH:mm:ss").diff(moment(start,"DD/MM/YYYY HH:mm:ss"));
                                        var d = moment.duration(ms);
  
                                        if (d.asHours() > 2) {
                                            insertCompOff(obj[0].data[i][0], fulldate, obj[0].data[i][2], obj[0].data[i][3], 17, false, 'System Entry');
                                        }
                                    }
                                }
                            }

                        } else {
                            console.log('Not a holiday');
                            for (var i = 7; i <= len - 2; i = i + 3) {
                                if (obj[0].data[i + 2] == 'DEPARTMENT: INFOOBJECTS') {
                                    i = i + 2;
                                    continue;
                                }
                                if (obj[0].data[i] == 'undefined') {
                                   
                                } else {

                                    if (obj[0].data[i][2] == ':' || obj[0].data[i][3] == ':') {
                                        insertAbsent(obj[0].data[i][0], fulldate, obj[0].data[i][2], obj[0].data[i][3], 20, 17, false);
                                    } else {
                                        // var starttm = new Date(year, month, date, obj[0].data[i][2].substring(0, 2), obj[0].data[i][2].substring(3, 5))
                                        // var endtm = new Date(year, month, date, obj[0].data[i][3].substring(0, 2), obj[0].data[i][3].substring(3, 5))
                                        // var hh = Math.floor((endtm - starttm) / 1000 / 60 / 60);
                                         var start=moment(date + '/' + month + '/' + year+' '+obj[0].data[i][2].substring(0, 2)+':'+obj[0].data[i][2].substring(3, 5)+':00');
                                        var end=moment(date + '/' + month + '/' +year+' '+obj[0].data[i][3].substring(0, 2)+':'+obj[0].data[i][3].substring(3, 5)+':00');
                                        var ms = moment(end,"DD/MM/YYYY HH:mm:ss").diff(moment(start,"DD/MM/YYYY HH:mm:ss"));
                                        var d = moment.duration(ms);
                                        if (d.asHours() < 2) {
                                            console.log(1);
                                            insertAbsent(obj[0].data[i][0], fulldate, obj[0].data[i][2], obj[0].data[i][3], 20, 17, false);
                                        } else if (d.asHours() >=2 && d.asHours() < 6) {
                                            console.log(0);
                                            insertAbsent(obj[0].data[i][0], fulldate, obj[0].data[i][2], obj[0].data[i][3], 21, 17, false);
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log('File does not exist');
                    }
                });
            });
        }
    });

}

function getfulldateDailySheet(filename){
     var date = filename.substring(0, 2);
    var month = getmonth(filename.substring(2, 5));
    var year = filename.substring(6, 10);
    var fulldate = year + '-' + month + '-' + date;
    return fulldate;
}
function insertAbsent(empId, absentDate, startTime, endTime, absentType, odStatus, isAdminEntry) {
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
        request = new Request("exec InsertAbsent @EmpId,@AbsentDate,@StartTime,@EndTime,@AbsentType,@ODStatus,@IsAdminEntry", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
			
            }
        });
request.addParameter('EmpId', TYPES.VarChar, empId);
request.addParameter('AbsentDate', TYPES.Date, absentDate);
request.addParameter('StartTime', TYPES.NVarChar, startTime);
request.addParameter('EndTime', TYPES.NVarChar, endTime);
request.addParameter('AbsentType', TYPES.Int, absentType);
request.addParameter('ODStatus', TYPES.Int, odStatus);
request.addParameter('IsAdminEntry', TYPES.Bit, isAdminEntry);

        connection.execSql(request);
    }
}

function insertCompOff(empId, compOffDate, startTime, endTime, compOffStatus, isManualEntry, CompOffReason) {
    console.log(compOffDate);
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
        request = new Request("exec Sp_InsertCompOff @EmpId,@CompOffDate,@StartTime,@EndTime,@CompOffStatus,@IsManual,@CompOffReason", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
			
            }
        });
request.addParameter('EmpId', TYPES.VarChar, empId);
request.addParameter('CompOffDate', TYPES.Date, compOffDate);
request.addParameter('StartTime', TYPES.NVarChar, startTime);
request.addParameter('EndTime', TYPES.NVarChar, endTime);

request.addParameter('CompOffStatus', TYPES.Int, compOffStatus);
request.addParameter('IsManual', TYPES.Bit, isManualEntry);
request.addParameter('CompOffReason', TYPES.NVarChar, CompOffReason);

        connection.execSql(request);
    }
	}

function isHoliDay(AttdenceDate, callback) {
   
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
        request = new Request("exec Sp_CheckIsHoliday @Date", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
			  console.log(rows[0].IsHoliDay.value);
              if (rows[0].IsHoliDay.value > 0) {

                    callback(true);
                } else {

                    callback(false);
                }
            }
        });
request.addParameter('Date', TYPES.Date, AttdenceDate);
        connection.execSql(request);
    }
}


function isDuplicateDate(AttdenceDate,empId, callback) {
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
        request = new Request("exec Sp_IsDuplicateDate @Date,@empId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
              if (rows[0].RCount.value > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        });
request.addParameter('Date', TYPES.Date, AttdenceDate);
request.addParameter('empId', TYPES.VarChar, empId);
        connection.execSql(request);
    }
	}

    function isDuplicateCompOff(AttdenceDate,empId, callback) {
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
        request = new Request("exec Sp_IsDuplicateCompoff @CompOffDate,@empId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
              if (rows[0].RCount.value > 0) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        });
request.addParameter('CompOffDate', TYPES.Date, AttdenceDate);
request.addParameter('empId', TYPES.VarChar, empId);
        connection.execSql(request);
    }
	}

    function isDuplicateDate_New(AttdenceDate,robj,eId, callback) {
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
        request = new Request("exec Sp_IsDuplicateDate @Date,@empId", function (err, rowCount, rows) {
            if (err) {
                console.log(err);
            } else {
              if (rows[0].RCount.value > 0) {
                    callback(true,eId,robj);
                } else {
                     callback(false,eId,robj);
                }
            }
        });
request.addParameter('Date', TYPES.Date, AttdenceDate);
request.addParameter('empId', TYPES.VarChar, eId);
        connection.execSql(request);
    }
	}

function getmonth(m) {
    if (m == 'Jan') {
        return '01'
    } else if (m == 'Feb') {
        return '02';
    } else if (m == 'Mar') {
        return '03';
    } else if (m == 'Apr') {
        return '04';
    } else if (m == 'May') {
        return '05';
    } else if (m == 'Jun') {
        return '06';
    }
	else if (m == 'Jul') {
        return '07';
    }	else if (m == 'Aug') {
        return '08';
    }else if (m == 'Sep') {
        return '09';
    }else if (m == 'Oct') {
        return '10';
    }else if (m == 'Nov') {
        return '11';
    }else if (m == 'Dec') {
        return '12';
    }
}


function excuteexcelmonthly(filename) {
    console.log('excute');
    var xlsFile = 'C:/upload/' + filename;
    var empId = 0;
    console.log(fnameorginal);
    var month = getmonth(fnameorginal.substring(0, 3));

    var year = fnameorginal.substring(3, 7);
    fs.exists(xlsFile, function (exists) {
        if (exists) {
            console.log('tygui');
            var obj = xlsx.parse(xlsFile);
            var len = obj[0].data.length;
            for (var i = 8; i <= len - 2; i = i + 1) {
                if (obj[0].data[i - 1][0] == "CATEGORY: INFOOBJECTS") {
                    empId = obj[0].data[i][0];
                    i = i + 1;
                    continue;
                }
                if (obj[0].data[i][0].indexOf("Present") > -1) {
                    i = i + 5;
                    continue;
                }
              
                if (obj[0].data[i][2] == '' || obj[0].data[i][3] == '' || obj[0].data[i][2]==':' ||obj[0].data[i][3]==':'||obj[0].data[i][2]==null||obj[0].data[i][3]==null) {
                               var fulldate = year + '-' + month + '-' + obj[0].data[i][0];
                     isDuplicateDate_New(fulldate,obj[0].data[i],empId,function(IsDuplicate,Eid,robj){
                        if(!IsDuplicate){
                          var Adate =year + '-' + month + '-' + robj[0];   
                    if (robj[1] != 'Sat' && robj[1] != 'Sun') {
                        console.log(Adate);
                    insertAbsent(Eid, Adate, robj[2], robj[3], 20, 17, false);
                       
                    }
                 }
                        });
                
                } else {
                     var fulldate =year + '-' + month + '-' + obj[0].data[i][0];
                   InsertMonthlyData(fulldate,obj[0].data[i],empId,year,month); 
                }
            }
        } else {
            console.log('File does not exist');
        }


    });
}

function InsertMonthlyData(fulldate,robj,empId,year,month) {
    
    isDuplicateDate(fulldate,empId,function(IsDuplicate){
         if(!IsDuplicate){
             
                      if(robj[2].split(":")[0].length==1){
                          robj[2]="0"+robj[2];
                      }
                         if (robj[1] != 'Sat' && robj[1] != 'Sun') {
                         var start=moment(new Date(robj[0] , month, year,robj[2].substring(0, 2),robj[2].substring(3, 5)));
                           var end=moment(new Date(robj[0] , month, year,robj[3].substring(0, 2),robj[3].substring(3, 5)));
var ms = moment(end,"DD/MM/YYYY HH:mm:ss").diff(moment(start,"DD/MM/YYYY HH:mm:ss"));
var d = moment.duration(ms);
var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
                        if (d.asHours() < 2) {
                            console.log(fulldate);
                            insertAbsent(empId, fulldate, robj[2], robj[3], 20, 17, false);
                        } else if (d.asHours() >= 2 && d.asHours() < 6) {
                            console.log(fulldate);
                            insertAbsent(empId, fulldate, robj[2], robj[3], 21, 17, false);
                        }
                    } 
                    else {
                        isDuplicateCompOff(fulldate,empId,function(IsDuplicateCOff) {
                           if(!IsDuplicateCOff){
                                insertCompOff(empId, fulldate, robj[2], robj[3], 17, false, 'System Entry');
                           } 
                        });
                       
                    }
                        }
    });
}
module.exports = router;