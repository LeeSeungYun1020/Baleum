var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: '바름 API 서버 - BALEUM API Server'});
});

module.exports = router;
