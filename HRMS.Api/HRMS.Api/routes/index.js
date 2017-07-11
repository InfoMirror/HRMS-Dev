var express = require('express');
var router = express.Router();

    /* GET home page. */
router.get('/', function (req, res) {
    console.log('response recieved at index.js: ');
    console.log(req.body);
    res.render('index', { title: 'Express' });
});

module.exports = router;