const connection = require("../lib/mysql")
const {sendJSONArrayResult, sendJSONObjectResult} = require("../lib/send")

function isNumber(num) {
    for (const n of num) {
        if ('0' <= n && n <= '9')
            continue
        return false
    }
    return true
}

module.exports = {
    // 클래스 단일 정보 반환
    getClass: (req, res) => {
        connection.query(`SELECT c.*, u.name as teacher
                          FROM class c
                                   JOIN user u on c.userId = u.id
                          WHERE c.id = ?`, [req.params.classId], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    },

    // 클래스 리스트 반환
    list: (req, res) => {
        let num = req.params.num ?? 8
        if (!isNumber(num))
            num = 8
        connection.query(`SELECT c.*, u.name as teacher
                          FROM class c
                                   JOIN user u on c.userId = u.id
                          LIMIT ${num}`, (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    },

    // 카테고리에 해당하는 클래스 리스트 반환
    categoryList: (req, res) => {
        connection.query(`SELECT c.*, u.name as teacher
                          FROM class c
                                   JOIN user u on c.userId = u.id
                          WHERE category = ?`, [req.params.classCategory], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    },

    // 검색하여 클래스 리스트 반환
    search: (req, res) => {
        const query = "%" + req.params.query + "%"
        connection.query(`SELECT c.*, u.name as teacher
                          FROM class c
                                   JOIN user u on c.userId = u.id
                          WHERE c.name LIKE ?
                             OR c.detail LIKE ?
                             OR c.category LIKE ?
                             OR u.name LIKE ?`, [query, query, query, query], (err, result) => {
            sendJSONArrayResult(res, err, result)
        })
    },

    // 수강 중인 강의 리스트 반환
    myTakingClass: (req, res) => {
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
    },

    // 생성한 강의 리스트 반환
    myTeachingClass: (req, res) => {
        if (req.user) {
            connection.query(`SELECT c.*, u.name as teacher
                              FROM class c
                                       JOIN user u on c.userId = u.id
                              WHERE c.userId = ?`, [req.user.id], (err, result) => {
                sendJSONArrayResult(res, err, result)
            })
        } else {
            res.send([{"result": false, "reason": "user login required"}])
        }
    },

    // 강의 생성
    create: (req, res) => {
        // name, detail, category, image 모두 string으로 들어옴
        if (req.user) {
            connection.query(`INSERT INTO class (name, detail, userId, category, image)
                              VALUES (?, ?, ?, ?,
                                      ?)`, [req.body.name, req.body.detail, req.user.id, req.body.category, req.body.image], (err, result) => {
                sendJSONObjectResult(res, err, result, true)
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    },

    // 강의 정보 수정
    update: (req, res) => {
        if (req.user) {
            connection.query(`UPDATE class
                              SET name     = ?,
                                  detail   = ?,
                                  category = ?,
                                  image    = ?
                              WHERE id = ?
                                AND userId = ?`, [req.body.name, req.body.detail, req.body.category, req.body.image, req.params.id, req.user.id], (err, result) => {
                sendJSONObjectResult(res, err, result, true)
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    },

    // 강의 삭제
    delete: (req, res) => {
        if (req.user) {
            connection.query(`DELETE
                              FROM class
                              WHERE id = ?
                                AND userId = ?`, [req.params.id, req.user.id], (err, result) => {
                sendJSONObjectResult(res, err, result, true)
            })
        } else {
            res.send({"result": false, "reason": "user login required"})
        }
    },
}
