var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');

router.post('/getAbsents', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.EmpId, "");
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetAbsentByEmployeeId', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error in Getting Absents: ');
                console.log(err);
            } else {
                if (results.length > 0) {
                    console.log(results);
                    res.json({
                        type: true,
                        data: results
                    });
                }
            }
        });
    });
});

router.post('/fileOD', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id, req.body.ODReason);
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_FileOD', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in File OD: ');
                console.log(err);
            } else {
                res.json({
                    type: true,
                    data: 'OD Updated'
                });
            }
        });
    });
});


router.get('/getCompOffs', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log('In Get Offs API');
        console.log(req.query.EmpId);
        var tableObjectValue = new Array(req.query.EmpId, "");
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetCompOffByEmployeeId', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error: ');
                console.log(err);
            } else {
                if (results.length > 0) {
                    //  console.log(results);
                    res.json({
                        type: true,
                        data: results
                    });
                }
            }
        });
    });
});

router.post('/insertCompOff', function (req, res) {
    //   console.log('insertCompOff');
    //  console.log(req.body);
    IsCompOffExist(req.body.CompOffDate, req.body.EmpId, function (IsExist) {

        if (IsExist) {
            //  console.log('in true');
            // console.log('CompOff Is Already Exist');
            res.json({
                type: true,
                data: 'CompOff Is Already Exist'
            });
        } else {
            //  console.log('in false');
            sql.open(sqlConfig, function (err, conn) {
                //  console.log(req.body);
                var tableObjectValue = new Array(req.body.EmpId, req.body.CompOffDate, '', '', req.body.CompOffStatus, req.body.isManual, req.body.compOffReason, '');
                //  console.log(tableObjectValue);
                var pm = conn.procedureMgr();
                pm.callproc('Sp_InsertCompOff', tableObjectValue, function (err, result, output) {
                    if (err) {
                        console.log('Error in Applying CompOff: ');
                        console.log(err);
                    } else {
                        res.json({
                            type: true,
                            data: 'CompOff Applied'
                        });
                    }
                });
            });
        }
    });

});

router.post('/markCompOff', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        console.log(req.body);
        var tableObjectValue = new Array(req.body.Id, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_MarkComOff', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in Marking CompOff: ');
                console.log(err);
            } else {
                res.json({
                    type: true,
                    data: 'CompOff Marked'
                });
            }
        });
    });
});

router.post('/getAppliedLeaves', function (req, res) {
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array(req.body.EmpId, '');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_GetappliedLeavesByEmployeeId', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log(err);
            } else {
                if (result.length > 0) {
                    res.json({
                        type: true,
                        data: result
                    });
                } else {
                    res.json({
                        type: true,
                        data: 'No Records Found'
                    });
                }
            }
        });
    });
});

router.post('/insertLeave', function (req, res) {
    IsLeaveDateExist(req.body.FromDate, req.body.ToDate, req.body.EmpId, function (IsExist) {
        if (IsExist) {
            //  console.log('in true');
            // console.log('CompOff Is Already Exist');
            res.json({
                type: true,
                data: 'Leave on same Date Already Exists'
            });
        } else {
            console.log('Hitting Insert Leaves Api');
            console.log(req.body);
            sql.open(sqlConfig, function (err, conn) {
                var tableObjectValue = new Array(req.body.EmpId, req.body.FromDate, req.body.ToDate, req.body.Reason, req.body.Status, '');
                console.log('Leave Data:');
                // console.log(tableObjectValue);
                var pm = conn.procedureMgr();
                pm.callproc('Sp_InsertLeave', tableObjectValue, function (err, result, output) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            type: true,
                            data: 'Leave Applied'
                        });
                    }
                });
            });
        }
    });

});

function IsCompOffExist(CompOffDate, EmpId, CallBack) {

    sql.open(sqlConfig, function (err, conn) {
        //console.log(req.body);
        var tableObjectValue = new Array(CompOffDate, EmpId);
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('Sp_IsDuplicateCompoff', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in IsCompOffExist: ');
                console.log(err);
            } else {
                //console.log('IsCompOffExist');
                //  console.log(CompOffDate);
                if (result[0].RCount > 0) {
                    // console.log('CallBack true');
                    CallBack(true);
                } else {
                    //  console.log('CallBack false');
                    CallBack(false);
                }
            }
        });
    });
}


function IsLeaveDateExist(FromDate, ToDate, EmpId, CallBack) {

    sql.open(sqlConfig, function (err, conn) {
        //console.log(req.body);
        var tableObjectValue = new Array(FromDate, ToDate, EmpId);
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('Sp_IsDuplicateApplyLeave', tableObjectValue, function (err, result, output) {
            if (err) {
                console.log('Error in IsLeaveDateExist: ');
                console.log(err);
            } else {
                if (result[0].RCount > 0) {
                    // console.log('CallBack true');
                    CallBack(true);
                } else {
                    //  console.log('CallBack false');
                    CallBack(false);
                }
            }
        });
    });
}

module.exports = router;