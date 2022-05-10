const connection = require("../lib/mysql")
const {sendJSONArrayResult} = require("../lib/send")
module.exports = {
    getCategory: (req, res) => {
        connection.query(`SELECT name
                          FROM classCategory`, (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    }
}
