var express = require('express');
var router = express.Router();
var sql = require('msnodesqlv8');
var sqlConfig = require('../config/sqlConfig.js');

router.get('/getBirthdays', function (req, res) {
    console.log(req.param);
    sql.open(sqlConfig, function (err, conn) {
        var tableObjectValue = new Array();
        console.log('Table Object Value: ');
        console.log(tableObjectValue);
        var pm = conn.procedureMgr();
        pm.callproc('sp_getUpcomingBirthdays', tableObjectValue, function (err, results, output) {
            if (err) {
                console.log('Error: ');
                console.log(err);
            }else{
                if(results.length>0){
                    console.log(results);
                    res.json({
                        type:true,
                        data:results
                    });
                }
            }
        });
    });
});

module.exports = router;