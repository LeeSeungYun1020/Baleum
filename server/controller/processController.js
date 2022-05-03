const connection = require("../lib/mysql")
const {sendJSONArrayResult, sendJSONObjectResult} = require("../lib/send")
const {takeIfClassCompleted, saveProcess} = require("../lib/class")
module.exports = {
    // 학습한 진도 과정 리스트
    list: (req, res) => {
        connection.query(`SELECT p.*, c.type, c.title
                          FROM process p
                                   JOIN content c ON p.classId = c.classId AND p.contentId = c.contentId
                          WHERE p.userId = ?
                            AND p.classId = ?
                          ORDER BY p.date`, [req.params.userId, req.params.classId], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    },

    completedList: (req, res) => {
        // 사용자별 완료된 강의만 표시
        connection.query(`SELECT p.*, c.type, c.title
                          FROM process p
                                   JOIN content c ON p.classId = c.classId AND p.contentId = c.contentId
                          WHERE p.userId = ?
                            AND (p.state = '수강 완료' OR p.state = '채점 완료')
                          ORDER BY p.date`, [req.params.userId], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    },

    // 영상 학습 완료
    videoDone: (req, res) => {
        if (req.user) {
            connection.query(`
                INSERT IGNORE INTO process (classId, contentId, userId, state, score, feedback)
                VALUES (?, ?, ?, '수강 완료', 100, (
                    SELECT title
                    FROM content
                    WHERE content.classId = ?
                      AND content.contentId = ?))`, [req.body.classId, req.body.contentId, req.user.id, req.body.classId, req.body.contentId], (err, result) => {
                sendJSONObjectResult(res, err, result, true)
                takeIfClassCompleted(req.user.id, req.body.classId)
                saveProcess(req.body.classId, req.body.contentId, req.user.id, "수강 완료")
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    },

    // 문제 응시 완료
    // TODO: 문제 부분 수정 필요
    testDone: (req, res) => {
        if (req.user) {
            const answers = req.body.answer ?? []
            let ansSQL = ""
            let ansValues = []
            answers.forEach((ans, idx) => {
                ansSQL += `REPLACE INTO test (classId, contentId, questionId, userId, answer)
                           VALUES (?, ?, ?, ?, ?);`
                ansValues.push(req.body.classId, req.body.contentId, idx + 1, req.user.id, ans)
            })

            connection.query(`
                REPLACE INTO process (classId, contentId, userId, state, score, feedback)
                VALUES (?, ?, ?, '제출 완료', 0, (
                    SELECT title
                    FROM content
                    WHERE content.classId = ?
                      AND content.contentId = ?));
            ` + ansSQL, [req.body.classId, req.body.contentId, req.user.id, req.body.classId, req.body.contentId].concat(ansValues), (err, result) => {
                sendJSONObjectResult(res, err, result, true)
                takeIfClassCompleted(req.user.id, req.body.classId)
                saveProcess(req.body.classId, req.body.contentId, req.user.id, "제출 완료")
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    }
    /*
    (req, res) => {
        if (req.user) {
            const feedback = req.body.feedback ?? ''
            connection.query(`
                UPDATE process
                SET state    = '채점 완료',
                    score    = ?,
                    feedback = CONCAT((
                                          SELECT title
                                          FROM content
                                          WHERE content.classId = ?
                                            AND content.contentId = ?), '\n${feedback}')
                WHERE userId = ?
                  AND classId = ?
                  AND contentId = ?
            `, [req.body.score, req.body.classId, req.body.contentId, req.user.id, req.body.classId, req.body.contentId], (err, result) => {
                sendJSONObjectResult(res, err, result, true)
                takeIfClassCompleted(req.user.id, req.body.classId)
                saveProcess(req.body.classId, req.body.contentId, req.user.id, "채점 완료")
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    }
    * */
}
