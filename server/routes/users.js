const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')

module.exports = function (passport) {
    // user 로그인 테스트 페이지
    router.get('/', function (req, res, next) {
        res.render("users", {user: req.user, message: req.body.message})
    })

    router.post('/signin',
        passport.authenticate('local', {
            session: true,
            failureRedirect: '/users'
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

    router.post('signout', (req, res) => {
        req.logout()
        req.session.save(() => {
            res.send({result: true})
        })
    })

    router.post("/signup", (req, res) => {
        const id = req.body.id
        const pw = req.body.pw

        connection.query("INSERT INTO `user` (id, pw) VALUES (?, ?)",
            [id, pw],
            (err, result) => {
                if (err)
                    res.send({result: false, isDuplicate: err.errno === 1062})
                else
                    res.send({result: true})
            })
    })
    return router
}