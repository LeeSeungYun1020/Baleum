const connection = require("./mysql")
module.exports = {takeIfClassCompleted, saveProcess}
const Learn = require('../lib/learn')
const learn = new Learn()
const Course = require('../lib/course')
const course = new Course()

// 학습 과정 확인하여 만족하는 경우 강의 수료 처리
function takeIfClassCompleted(userId, classId) {
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
                  )`, [userId, classId, classId, classId, userId], async (err, result) => {
        if (result) {
            //setClass(userId, classId, completedDate, name, detail, teacher, category)
            if (result.affectedRows > 0) {
                connection.query(`
                    SELECT t.userId, classId, completedDate, c.userId as teacher, c.name, c.detail, c.category
                    FROM takingClass t
                             JOIN class c on c.id = t.classId
                    WHERE t.userId = ?
                      AND t.classId = ?
                      AND t.isCompleted = true
                `, [userId, classId], async (selectErr, selectResult) => {
                    if (!selectErr && selectResult.length === 1) {
                        const class1 = selectResult[0]
                        await course.setClass(userId, classId, class1.completedDate, class1.name, class1.detail, class1.teacher, class1.category)
                    }
                })
            }
        }
    })
}

// 프로세스 이더리움 블록체인에 저장
function saveProcess(classId, contentId, userId) {
    connection.query(`SELECT *
                      FROM process
                      WHERE classId = ?
                        AND contentId = ?
                        AND userId = ?
                        AND isSaved = false`, [classId, contentId, userId], async (err, result) => {
        if (!err && result.length === 1) {
            const process = result[0]
            await learn.setProcess(process.classId, process.contentId, process.userId, process.date, process.state, process.score, process.feedback)
        }
    })
}