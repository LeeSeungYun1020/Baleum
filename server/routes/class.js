const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')
const {sendJSONArrayResult, sendJSONObjectResult} = require('../lib/send')

router.get('/list/:num', (req, res) => {
    let num = req.params.num ?? 8
    for (const n of num) {
        if ('0' <= n && n <= '9')
            continue
        num = 8
        break
    }
    connection.query(`SELECT c.*, u.name as teacher
                      FROM class c
                               JOIN user u on c.userId = u.id
                      LIMIT ${num}`, (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/info/:classId', (req, res) => {
    connection.query(`SELECT c.*, u.name as teacher
                      FROM class c
                               JOIN user u on c.userId = u.id
                      WHERE id = ?`, [req.params.classId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/all', (req, res) => {
    res.redirect("/class/list/16")
})

router.get('/main', (req, res) => {
    res.redirect("/class/list/8")
})

router.get('/category/list', (req, res) => {
    connection.query(`SELECT name
                      FROM classCategory`, (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/category/:classCategory', (req, res) => {
    connection.query(`SELECT c.*, u.name as teacher
                      FROM class c
                               JOIN user u on c.userId = u.id
                      WHERE category = ?`, [req.params.classCategory], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/search/:query', (req, res) => {
    const query = "%" + req.params.query + "%"
    connection.query(`SELECT c.*, u.name as teacher
                      FROM class c
                               JOIN user u on c.userId = u.id
                      WHERE c.name LIKE ?
                         OR c.detail LIKE ?
                         OR c.category LIKE ?
                         OR u.name as teacher LIKE ?`, [query, query, query, query], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.post('/enrol/:classId', (req, res) => {
    if (req.user) {
        connection.query(`INSERT IGNORE INTO takingclass (userId, classId)
                          VALUES (?, ?)`, [req.user.id, req.params.classId], (err, result) => {
            sendJSONObjectResult(res, err, result, true)
        })
    } else {
        res.send({"result": false, "reason": "user login required"})
    }

})

router.get('/my', (req, res) => {
    if (req.user) {
        connection.query(`SELECT c.*, u.name as teacher
                          FROM class c
                                   JOIN takingClass t on c.id = t.classId
                                   JOIN user u on c.userId = u.id
                          WHERE t.userId = ?
                            AND t.isCompleted = FALSE`, [req.user.id], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    } else {
        res.send([{"result": false, "reason": "user login required"}])
    }

})

router.get('/notice/class/:classId', (req, res) => {
    connection.query(`SELECT *
                      FROM notice
                      WHERE classId = ?`, [req.params.classId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.post('/notice/create', (req, res) => {
    if (req.user) {
        connection.query(`INSERT INTO notice (classId, title, contents, userId)
                          VALUES (?, ?, ?,
                                  ?)`, [req.body.classId, req.body.title, req.body.contents, req.user.id], (err, result) => {
            sendJSONObjectResult(res, err, result, true)
        })
    } else {
        res.send({"result": false, "reason": "user login required"})
    }
})

router.post('/notice/update/:id', (req, res) => {
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
})

router.get('/notice/read/:id', (req, res) => {
    connection.query(`SELECT n.*, u.name as teacher
                      FROM notice n
                               JOIN user u on n.userId = u.id
                      WHERE n.id = ?`, [req.params.id], (err, result) => {
        sendJSONObjectResult(res, err, result)
    })
})

router.delete('/notice/delete/:id', (req, res) => {
    if (req.user) {
        connection.query(`DELETE
                          FROM notice
                          WHERE id = ?`, [req.user.id], (err, result) => {
            sendJSONObjectResult(res, err, result, true)
        })
    } else {
        res.send({"result": false, "reason": "user login required"})
    }
})

router.get('/process/:userId/:classId', (req, res) => {
    // 수강 취소한 강의는 표시하지 않기 위해 join 실행
    connection.query(`SELECT p.*
                      FROM process p
                               JOIN takingClass t ON p.classId = t.classId AND p.userId = t.userId
                      WHERE p.userId = ?
                        AND p.classId = ?`, [req.params.userId, req.params.classId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/process/:userId', (req, res) => {
    // 사용자별 완료된 강의만 표시
    connection.query(`SELECT *
                      FROM process
                      WHERE userId = ?
                        AND (state = '수강 완료' OR state = '채점 완료')`, [req.params.userId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/contents/:classId/:contentId', (req, res) => {
    connection.query(`SELECT *
                      FROM content
                      WHERE classId = ?
                        AND contentId = ?`, [req.params.classId, req.params.contentId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/contents/:classId', (req, res) => {
    connection.query(`SELECT *
                      FROM content
                      WHERE classId = ?`, [req.params.classId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

function setIfCompleted(userId, classId) {
    connection.query(`
        UPDATE takingClass
        SET isCompleted= TRUE,
            completedDate=CURRENT_TIMESTAMP
        WHERE (
                          userId = ? AND classID = ? AND
                          (SELECT COUNT(contentId) as nContents FROM content WHERE classId = ?) =
                          (SELECT COUNT(contentId) as nCompleted
                           FROM process
                           WHERE classId = ?
                             AND userId = ?
                             AND (state = '수강 완료' OR state = '채점 완료'))
                  )`, [userId, classId, classId, classId, userId], (err, result) => {
        if (result) {
            if (result.affectedRows > 0) {
                // TODO: 블록체인에 학습 수료 여부 저장 isSaved 변경
            }
        }
    })
}

router.post('/done/video', (req, res) => {
    if (req.user) {
        connection.query(`
            INSERT IGNORE INTO process (classId, contentId, userId, state, score, feedback)
            VALUES (?, ?, ?, '수강 완료', 100, (
                SELECT title
                FROM content
                WHERE content.classId = ?
                  AND content.contentId = ?))`, [req.body.classId, req.body.contentId, req.user.id, req.body.classId, req.body.contentId], (err, result) => {
            sendJSONObjectResult(res, err, result, true)
            setIfCompleted(req.user.id, req.body.classId)
            // TODO: 블록체인에 학습 과정 저장 isSaved 변경
        })
    } else {
        res.send({"result": false, "reason": "user login required"})
    }
})

router.post('/done/test', (req, res) => {
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
            setIfCompleted(req.user.id, req.body.classId)
            // TODO: 블록체인에 학습 과정 저장 isSaved 변경
        })
    } else {
        res.send({"result": false, "reason": "user login required"})
    }

})

router.post('/done/test/score', (req, res) => {
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
            setIfCompleted(req.user.id, req.body.classId)
            // TODO: 블록체인에 학습 과정 저장 isSaved 변경
        })
    } else {
        res.send({"result": false, "reason": "user login required"})
    }
})

router.get('/complete/list/:userId', (req, res) => {
    connection.query(`SELECT c.*, u.name as teacher
                      FROM class c
                               JOIN takingClass t on c.id = t.classId
                               JOIN user u on c.userId = u.id
                      WHERE t.userId = ?
                        AND t.isCompleted = TRUE`, [req.params.userId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/complete/:userId/:classId', (req, res) => {
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
            if (result[0]["isCompleted"] === 1)
                result[0]["isCompleted"] = true
            else
                result[0]["isCompleted"] = false
            res.send(result)
        }
    })
})

module.exports = router;
