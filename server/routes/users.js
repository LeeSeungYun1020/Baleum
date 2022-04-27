const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')
const {sendJSONObjectResult} = require('../lib/send')

module.exports = function (passport) {
    // user 로그인 테스트 페이지
    router.get('/', function (req, res) {
        res.render("users", {user: req.user, message: req.body.message})
    })

    router.post('/signin/internal',
        passport.authenticate('local', {
            session: true,
            failureRedirect: '/users'
        }),
        (req, res) => {
            res.send({user: req.user, result: true})
        })

    router.get('/signin/fail', (req, res) => {
        res.send({user: null, result: false})
    })

    router.post('/signin',
        passport.authenticate('local', {
            session: true,
            failureRedirect: '/users/signin/fail'
        }),
        (req, res) => {
            res.send({user: req.user, result: true})
        })

    router.get('/signout', (req, res) => {
        req.logout()
        req.session.save(() => {
            res.redirect('/users');
        })
    })

    router.post('/signout', (req, res) => {
        req.logout()
        req.session.save(() => {
            res.send({result: true})
        })
    })

    router.post("/signup", (req, res) => {
        const id = req.body.id
        const pw = req.body.pw
        const name = req.body.name
        const detail = req.body.detail ?? ''
        const phone = req.body.phone ?? ''

        connection.query("INSERT INTO `user` (id, pw, name, detail, phone) VALUES (?, ?, ?, ?, ?)",
            [id, pw, name, detail, phone],
            (err) => {
                if (err)
                    res.send({result: false, isDuplicate: err.errno === 1062})
                else
                    res.send({result: true})
            })
    })

    router.get("/name/:id", (req, res) => {
        const id = req.params.id

        connection.query("SELECT name FROM user WHERE id = ?",
            [id],
            (err, result) => {
                sendJSONObjectResult(res, err, result)
            })
    })

    return router


}
