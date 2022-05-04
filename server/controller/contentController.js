const connection = require("../lib/mysql")
const {sendJSONArrayResult} = require("../lib/send")
module.exports = {
    // 특정 클래스의 특정 컨텐츠 가져오기
    get: (req, res) => {
        connection.query(`SELECT *
                          FROM content
                          WHERE classId = ?
                            AND contentId = ?`, [req.params.classId, req.params.contentId], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    },

    // 특정 클래스의 모든 컨텐츠 목록
    list: (req, res) => {
        connection.query(`SELECT *
                          FROM content
                          WHERE classId = ?`, [req.params.classId], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    },
}
