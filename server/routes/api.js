const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const fs = require('fs')
const parse = require('csv-parse')

router.route('/')
    .get((req, res, next) => {

        const createApiHtml = async () => {
            let html = ""
            let table = `<table>
<tr>
    <th>이름</th><th>설명</th><th>방법</th><th>주소</th><th>파라미터</th><th>반환값</th>
</tr>
`
            const parser = fs
                .createReadStream(`data/api.csv`)
                .pipe(parse.parse({
                    // CSV options
                }))
            let isFirst = true
            for await (const record of parser) {
                html += `
                    <div>
                        <h2>${record[0]}</h2>
                        <h3>${record[2]}</h3>
                        <p>${record[3]}: ${record[4]}</p>
                        <p>params: ${record[5]}</p>
                        <p>return: ${record[6]}</p>
                    </div>
`
                if (isFirst) {
                    table += `
                    <tr class="first">
                        <td>${record[0]}</td><td>${record[2]}</td><td>${record[3]}</td>
                        <td>${record[4]}</td><td>${record[5]}</td><td>${record[6]}</td>
                    </tr>`
                    isFirst = false
                } else {
                    table += `
                        <tr class="else">
                            <td>${record[0]}</td><td>${record[2]}</td><td>${record[3]}</td>
                            <td>${record[4]}</td><td>${record[5]}</td><td>${record[6]}</td>
                        </tr>`
                }


            }
            table += "</table>"
            return [html, table]
        }

        (async () => {
            const html = await createApiHtml()
            req.session.apiDesc = html[0]
            req.session.apiTable = html[1]
            res.redirect("/")
        })()
    })

module.exports = router