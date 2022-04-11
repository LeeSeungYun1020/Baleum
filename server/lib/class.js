const connection = require("./mysql")
module.exports = {takeIfClassCompleted, saveProcess}
const Learn = require('../lib/learn')
const learn = new Learn()

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
            if (result.affectedRows > 0) {
                // TODO: 블록체인에 학습 수료 여부 저장 isSaved 변경
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
            checkProcessSaveThenUpdate(classId, contentId, userId)
        }
        // TODO: 블록체인 연동 테스트 필요
    })
}

// 프로세스 확인하여 저장 여부 업데이트
function checkProcessSaveThenUpdate(classId, contentId, userId) {
    learn.getProcess(classId, contentId, userId).then(process => {
            if (process.date !== '' || process.state !== '') {
                connection.query(`UPDATE process
                                  SET isSaved = true
                                  WHERE classId = ?
                                    AND contentId = ?
                                    AND userId = ?`, [classId, contentId, userId], async (err, result) => {
                    if (err)
                        console.error(err.message)
                })
            }
        }
    )

}