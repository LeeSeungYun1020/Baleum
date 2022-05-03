const connection = require("../lib/mysql")
const {sendJSONObjectResult} = require("../lib/send")
module.exports = {
    // 수강 신청
    enrol: (req, res) => {
        if (req.user) {
            connection.query(`INSERT IGNORE INTO takingClass (userId, classId)
                              VALUES (?, ?)`, [req.user.id, req.params.classId], (err, result) => {
                sendJSONObjectResult(res, err, result, true)
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    },

    // 수강 전인 강의인지 확인
    isBefore: (req, res) => {
        if (req.user) {
            connection.query(`SELECT *
                              FROM takingclass
                              WHERE userId = ?
                                AND classId = ?`, [req.user.id, req.params.classId], (err, result) => {
                res.send({result: result.length < 1})
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    },
}
