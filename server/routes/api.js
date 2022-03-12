const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')

router.get('/', function (req, res, next) {
    res.redirect("/")
});

module.exports = router;