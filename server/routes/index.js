const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    const cmd = req.session.command
    const dbError = req.session.dbError
    req.session.command = undefined
    req.session.dbError = undefined
    if (req.session.apiDesc)
        res.render('index', {
            title: '바름 API 서버 - BALEUM API Server',
            command: cmd,
            commandError: dbError,
            apiDesc: req.session.apiDesc,
            apiTable: req.session.apiTable
        });
    else
        res.redirect('/api')
})

module.exports = router
