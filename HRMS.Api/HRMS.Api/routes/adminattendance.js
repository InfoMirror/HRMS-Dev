var express = require('express');
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');
var multer = require('multer');
var router = express.Router();
var fs = require("fs");
var xlsx = require('node-xlsx');
var filename = '';
var fnameorginal = '';
var absentCount = 0;
var HalfabsentCount = 0;

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
   // console.log("upload");
    //  console.log(file);
//console.log(req.data);
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
   // console.log("upload");
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

        res.json({
            error_code: 0,
            err_desc: ''
        });
        console.log(res)
    })

});
function excuteexcel(filename) {
    var xlsFile = 'C:/upload/' + filename;

    var date = fnameorginal.substring(0, 2);
    var month = getmonth(fnameorginal.substring(2, 5));
    var year = fnameorginal.substring(6, 10);
    var fulldate = year + '-' + month + '-' + date;
    var day = new Date(year, month, date).getDay();
    console.log(day);
    isHoliDay(fulldate, function (IsHoliday) {
       
        fs.exists(xlsFile, function (exists) {
            if (exists) {
                var obj = xlsx.parse(xlsFile);
                var len = obj[0].data.length;
                if (day == 0 || day == 1 || IsHoliday) {
                    console.log('holiday');
                    for (var i = 7; i <= len - 2; i = i + 3) {
                        if (obj[0].data[i + 2] == 'DEPARTMENT: INFOOBJECTS') {
                            i = i + 2;
                            continue;
                        }

                        if (obj[0].data[i] == 'undefined') {
                            console.log(obj[0].data[i])
                        } else {


                            //console.log(hh);
                            //console.log(starttm - endtm);
                            if (obj[0].data[i][2] == '' || obj[0].data[i][3] == '') {


                            } else {
                                var starttm = new Date(year, month, date, obj[0].data[i][2].substring(0, 2), obj[0].data[i][2].substring(3, 5))
                                var endtm = new Date(year, month, date, obj[0].data[i][3].substring(0, 2), obj[0].data[i][3].substring(3, 5))
                                var hh = Math.floor((endtm - starttm) / 1000 / 60 / 60);


                                if (hh > 2) {

                                    insertCompOff(obj[0].data[i][0], fulldate, obj[0].data[i][2], obj[0].data[i][3], 17, false);
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
                            console.log(obj[0].data[i])
                        } else {


                            //console.log(hh);
                            //console.log(starttm - endtm);
                            if (obj[0].data[i][2] == '' || obj[0].data[i][3] == '') {
                                insertAbsent(obj[0].data[i][0], fulldate, obj[0].data[i][2], obj[0].data[i][3], 20, 17, false);

                            } else {
                                var starttm = new Date(year, month, date, obj[0].data[i][2].substring(0, 2), obj[0].data[i][2].substring(3, 5))
                                var endtm = new Date(year, month, date, obj[0].data[i][3].substring(0, 2), obj[0].data[i][3].substring(3, 5))
                                var hh = Math.floor((endtm - starttm) / 1000 / 60 / 60);


                                if (hh < 2) {
                                    insertAbsent(obj[0].data[i][0], fulldate, obj[0].data[i][2], obj[0].data[i][3], 20, 17, false);


                                } else if (hh > 2 && hh < 9) {
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

function insertAbsent(empId, absentDate, startTime, endTime, absentType, odStatus, isAdminEntry) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(empId, absentDate, startTime, endTime, absentType, odStatus, isAdminEntry);
        var pm = conn.procedureMgr();
        pm.callproc('InsertAbsent', tableObjectValue, function (err, result1, output) {
            if (err) {
                console.log(err);
            } else {
                if (absentType == 20) {
                    absentCount++;
                } else if (absentType == 21) {
                    HalfabsentCount++;
                }
            }
        });
        if (err) {
            console.log('Connection Error: ' + err);
        }
    });
}

function insertCompOff(empId, compOffDate, startTime, endTime, compOffStatus, isManualEntry,CompOffReason) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(empId, compOffDate, startTime, endTime, compOffStatus, isManualEntry,CompOffReason);
        var pm = conn.procedureMgr();
        pm.callproc('Sp_InsertCompOff', tableObjectValue, function (err, result1, output) {
            if (err) {
                console.log(err);
            } else {

            }
        });
        if (err) {
            console.log('Connection Error: ' + err);
        }
    });
}

function isHoliDay(AttdenceDate, callback) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(AttdenceDate);
        var pm = conn.procedureMgr();
        pm.callproc('Sp_CheckIsHoliday', tableObjectValue, function (err, result1, output) {
            if (err) {
                console.log(err);
            } else {
                console.log(result1[0].IsHoliDay)
                if (result1[0].IsHoliDay > 0) {

                    callback(true);
                } else {

                    callback(false);
                }
            }
        });
        if (err) {
            console.log('Connection Error: ' + err);
        }
    });
}

function toDate(dStr, format) {
    var now = new Date(dStr);
    console.log(now);
    /*if (format == "h:m") {
 		now.setHours(dStr.substr(0,dStr.indexOf(":")));
 		now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
 		now.setSeconds(0);
 		return now;
	}else 
		return "Invalid Format";*/
}

function getmonth(m) {

    if (m == 'Jan') {
        return '01'
    } else if (m == 'Feb') {
        return '02';
    }
    else if (m == 'March') {
        return '03';
    }
    else if (m == 'Apirl') {
        return '04';
    }
    else if (m == 'May') {
        return '05';
    }
    else if (m == 'June') {
        return '06';
    }
    else if (m == 'July') {
        return '07';
    }
}


function excuteexcelmonthly(filename){
    console.log('excute');
    var xlsFile = 'C:/upload/' + filename;
    var empId=0;
    console.log(fnameorginal);
    var month= getmonth(fnameorginal.substring(0,3));
   
    var year=fnameorginal.substring(3,7);
      fs.exists(xlsFile, function (exists) {
            if (exists) {
                console.log('tygui');
                var obj = xlsx.parse(xlsFile);
                var len = obj[0].data.length;
               console.log(len);
                    for (var i = 8; i <= len - 2; i = i+1) {
                       // console.log(i);
                       if(obj[0].data[i-1][0]=="CATEGORY: INFOOBJECTS"){
                           empId=obj[0].data[i][0];
                           i=i+2;
                           continue;
                       } if(obj[0].data[i][0].indexOf("Presen")>-1){
                           i=i+5;
                           continue;
                       }
                        if(obj[0].data[i][2]=='' || obj[0].data[i][3]==''){
                           // day=obj[0].data[i][0];
                            console.log('FL');
                          var fulldate = year + '-' + month + '-' + obj[0].data[i][0];
                             insertAbsent(empId, fulldate, obj[0].data[i][2], obj[0].data[i][3], 20, 17, false);
                        }else{
                             var fulldate = year + '-' + month + '-' + obj[0].data[i][0];
                        console.log(fulldate);
                             var starttm = new Date(year, month, obj[0].data[i][0], obj[0].data[i][2].substring(0, 2), obj[0].data[i][2].substring(3, 5))
                                var endtm = new Date(year, month, obj[0].data[i][0], obj[0].data[i][3].substring(0, 2), obj[0].data[i][3].substring(3, 5))
                                var hh = Math.floor((endtm - starttm) / 1000 / 60 / 60);


                                if (hh < 2) {
                                    console.log('HL');
                                    insertAbsent(empId, fulldate, obj[0].data[i][2], obj[0].data[i][3], 20, 17, false);


                                } else if (hh > 2 && hh < 9) {
                                    console.log('FL');
                                    insertAbsent(empId, fulldate, obj[0].data[i][2], obj[0].data[i][3], 21, 17, false);


                                }
                        }
                    }

               
            } else {
                console.log('File does not exist');
            }


        });
}

module.exports = router;