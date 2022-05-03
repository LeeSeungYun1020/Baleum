const connection = require("../lib/mysql")
const {sendJSONArrayResult, sendJSONObjectResult} = require("../lib/send")
module.exports = {
    // 강의별 공지사항 목록
    list: (req, res) => {
        connection.query(`SELECT *
                          FROM notice
                          WHERE classId = ?`, [req.params.classId], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    },

    // 공지사항 생성
    create: (req, res) => {
        if (req.user) {
            connection.query(`INSERT INTO notice (classId, title, contents, userId)
                              VALUES (?, ?, ?,
                                      ?)`, [req.body.classId, req.body.title, req.body.contents, req.user.id], (err, result) => {
                sendJSONObjectResult(res, err, result, true)
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    },

    // 공지사항 수정
    update: (req, res) => {
        if (req.user) {
            connection.query(`UPDATE notice
                              SET title    = ?,
                                  contents = ?
                              WHERE id = ?`, [req.body.title, req.body.contents, req.params.id], (err, result) => {
                sendJSONObjectResult(res, err, result, true)
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    },

    // 공지사항 조회
    read: (req, res) => {
        connection.query(`SELECT n.*, u.name as teacher
                          FROM notice n
                                   JOIN user u on n.userId = u.id
                          WHERE n.id = ?`, [req.params.id], (err, result) => {
            sendJSONObjectResult(res, err, result)
        })
    },

    // 공지사항 삭제
    delete: (req, res) => {
        if (req.user) {
            connection.query(`DELETE
                              FROM notice
                              WHERE id = ?`, [req.user.id], (err, result) => {
                sendJSONObjectResult(res, err, result, true)
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    }
}
