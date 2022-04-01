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


module.exports = router;
