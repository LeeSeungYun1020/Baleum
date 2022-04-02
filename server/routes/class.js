const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')

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
        console.log(err)
        if (err || result.length === 0)
            res.send([{result: false}])
        else {
            result[0]["result"] = true
            res.send(result)
        }
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
        console.log(err)
        if (err || result.length === 0)
            res.send([{result: false}])
        else {
            result[0]["result"] = true
            res.send(result)
        }
    })
})

router.get('/my/:userId', (req, res) => {
    connection.query(`SELECT c.*
                      FROM class c
                               JOIN takingclass t on c.id = t.classId
                      WHERE t.userId = ?`, [req.params.userId], (err, result) => {
        console.log(err)
        if (err || result.length === 0)
            res.send([{result: false}])
        else {
            result[0]["result"] = true
            res.send(result)
        }
    })
})

router.get('/info/:classId', (req, res) => {
    connection.query(`SELECT *
                      FROM class
                      WHERE id = ?`, [req.params.classId], (err, result) => {
        console.log(err)
        if (err || result.length === 0)
            res.send([{result: false}])
        else {
            result[0]["result"] = true
            res.send(result)
        }
    })
})

router.get('/notice/:classId', (req, res) => {
    connection.query(`SELECT *
                      FROM notice
                      WHERE classId = ?`, [req.params.classId], (err, result) => {
        console.log(err)
        if (err || result.length === 0)
            res.send([{result: false}])
        else {
            result[0]["result"] = true
            res.send(result)
        }
    })
})

// 남은 구현 순서: 강의 진도 / 강의 수강

module.exports = router;
