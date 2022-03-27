const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const fs = require('fs')
const parse = require('csv-parse')

router.route('/')
    .get((req, res, next) => {

        const createApiHtml = async () => {
            let html = ""
            const parser = fs
                .createReadStream(`data/api.csv`)
                .pipe(parse.parse({
                    // CSV options
                }))
            for await (const record of parser) {
                html += `<div>
    <h2>${record[0]}</h2>
    <h3>${record[2]}</h3>
    <p>${record[3]}: ${record[4]}</p>
    <p>params: ${record[5]}</p>
    <p>return: ${record[6]}</p>
</div>
`
            }
            return html
        }

        (async () => {
            const html = await createApiHtml()
            req.session.apiDesc = html
            res.redirect("/")
        })()
    })

module.exports = router