const express = require('express');
const router = express.Router();
const connection = require('../lib/mysql')

router.get('/list/:num', (req, res) => {
    connection.query(`SELECT *
                      FROM class
                      LIMIT ?`, [req.params.num], (err, result) => {
        if (err || result.length === 0)
            res.send([{result: false}])
        else {
            result[0]["result"] = true
            res.send(result)
        }
    })
})

router.get('/all', (req, res) => {
    res.redirect("/class/list/32")
})

router.get('/main', (req, res) => {
    res.redirect("/class/list/8")
})

module.exports = router;
