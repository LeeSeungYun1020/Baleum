const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    const cmd = req.session.command
    req.session.command = null
    if (req.session.apiDesc)
        res.render('index', {title: '바름 API 서버 - BALEUM API Server', command: cmd, apiDesc: req.session.apiDesc});
    else
        res.redirect('/api')
})

module.exports = router
