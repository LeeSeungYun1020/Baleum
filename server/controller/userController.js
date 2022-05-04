const connection = require("../lib/mysql")
const {sendJSONObjectResult} = require("../lib/send")
module.exports = {
    // 사용자 로그인 테스트 페이지 표시
    renderIndexPage: function (req, res) {
        res.render("users", {user: req.user, message: req.body.message})
    },

    // 로그인 성공
    signInSuccess:
        (req, res) => {
            res.send({user: req.user, result: true})
        },

    // 로그인 실패
    signInFailure:
        (req, res) => {
            res.send({user: null, result: false})
        },

    // 로그아웃 내부망용
    signOutInternal:
        (req, res) => {
            req.logout()
            req.session.save(() => {
                res.redirect('/users');
            })
        },

    // 로그아웃
    signOut: (req, res) => {
        req.logout()
        req.session.save(() => {
            res.send({result: true})
        })
    },

    // 회원가입
    signUp: (req, res) => {
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
    },

    // id로 이름 조회
    getName: (req, res) => {
        const id = req.params.id

        connection.query("SELECT name FROM user WHERE id = ?",
            [id],
            (err, result) => {
                sendJSONObjectResult(res, err, result)
            })
    }
}
