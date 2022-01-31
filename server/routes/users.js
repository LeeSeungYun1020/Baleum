const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')

module.exports = function (passport) {
    // user 로그인 테스트 페이지
    router.get('/', function (req, res, next) {
        if (req.user)
            res.send(req.user)
        else
            res.render("users", {message: "로그인하세요"})
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
            res.redirect('/');
        });
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