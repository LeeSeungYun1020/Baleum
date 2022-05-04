const connection = require("../lib/mysql")
const {sendJSONObjectResult, sendJSONArrayResult} = require("../lib/send")
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

    // 수강 완료한 강의인지 확인
    isCompleted: (req, res) => {
        connection.query(`SELECT t.isCompleted
                          FROM class c
                                   JOIN takingClass t on c.id = t.classId
                          WHERE t.userId = ?
                            AND t.classId = ?
                            AND t.isCompleted = TRUE`, [req.params.userId, req.params.classId], (err, result) => {
            if (err || result.length === 0)
                res.send([{result: false, isCompleted: false}])
            else {
                result[0]["result"] = true
                result[0]["isCompleted"] = result[0]["isCompleted"] === 1;
                res.send(result)
            }
        })
    },

    // 완료한 강의 리스트
    completedList: (req, res) => {
        connection.query(`SELECT c.*, u.name as teacher, t.completedDate, t.blockHash, t.transactionHash
                          FROM class c
                                   JOIN takingClass t on c.id = t.classId
                                   JOIN user u on c.userId = u.id
                          WHERE t.userId = ?
                            AND t.isCompleted = TRUE`, [req.params.userId], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    }
}
