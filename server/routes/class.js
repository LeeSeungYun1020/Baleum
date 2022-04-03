const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')
const {sendJSONArrayResult} = require('../lib/send')

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

router.get('/notice/:classId', (req, res) => {
    connection.query(`SELECT *
                      FROM notice
                      WHERE classId = ?`, [req.params.classId], (err, result) => {
        sendJSONArrayResult(res, err, result)
    })
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

module.exports = router;
