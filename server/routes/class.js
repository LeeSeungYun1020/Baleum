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
    connection.query(`SELECT *
                      FROM class
                      LIMIT ${num}`, (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/all', (req, res) => {
    res.redirect("/class/list/16")
})

router.get('/main', (req, res) => {
    res.redirect("/class/list/8")
})


router.get('/search/:query', (req, res) => {
    const query = "%" + req.params.query + "%"
    connection.query(`SELECT *
                      FROM class
                      WHERE name LIKE ?
                         OR detail LIKE ?
                         OR category LIKE ?`, [query, query, query], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/my/:userId', (req, res) => {
    connection.query(`SELECT c.*
                      FROM class c
                               JOIN takingClass t on c.id = t.classId
                      WHERE t.userId = ?`, [req.params.userId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
})

router.get('/info/:classId', (req, res) => {
    connection.query(`SELECT *
                      FROM class
                      WHERE id = ?`, [req.params.classId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
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
    connection.query(`SELECT *
                      FROM notice
                      WHERE id = ?`, [req.params.id], (err, result) => {
        sendJSONObjectResult(res, err, result)
    })
})

router.delete('/notice/delete/:id', (req, res) => {
    if (req.user) {
        connection.query(`DELETE
                          FROM notice
                          WHERE id = ?`, [req.params.id], (err, result) => {
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

router.post('/done/video', (req, res) => {
    connection.query(`
        INSERT IGNORE INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (?, ?, ?, '수강 완료', 100, (
            SELECT title
            FROM content
            WHERE content.classId = ?
              AND content.contentId = ?))`, [req.body.classId, req.body.contentId, req.body.userId, req.body.classId, req.body.contentId], (err, result) => {
        sendJSONObjectResult(res, err, result, true)
    })
})

router.post('/done/test', (req, res) => {
    const answers = req.body.answer ?? []
    let ansSQL = ""
    let ansValues = []
    answers.forEach((ans, idx) => {
        ansSQL += `REPLACE INTO test (classId, contentId, questionId, userId, answer)
                   VALUES (?, ?, ?, ?, ?);`
        ansValues.push(req.body.classId, req.body.contentId, idx + 1, req.body.userId, ans)
    })

    connection.query(`
        REPLACE INTO process (classId, contentId, userId, state, score, feedback)
        VALUES (?, ?, ?, '제출 완료', 0, (
            SELECT title
            FROM content
            WHERE content.classId = ?
              AND content.contentId = ?));
    ` + ansSQL, [req.body.classId, req.body.contentId, req.body.userId, req.body.classId, req.body.contentId].concat(ansValues), (err, result) => {
        sendJSONObjectResult(res, err, result, true)
    })
})

router.post('/done/test/score', (req, res) => {
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
    `, [req.body.score, req.body.classId, req.body.contentId, req.body.userId, req.body.classId, req.body.contentId], (err, result) => {
        sendJSONObjectResult(res, err, result, true)
    })
})

module.exports = router;
