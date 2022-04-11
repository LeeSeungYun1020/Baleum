const express = require('express')
const router = express.Router()
const Learn = require('../lib/learn')

const learn = new Learn()

router.get('/', async function (req, res, next) {
    res.redirect("/contract/all")
})

router.get('/all', async function (req, res, next) {
    const processes = await learn.getAllProcess()
    res.send(processes)
})

router.get('/read/:classId/:contentId/:userId', async function (req, res, next) {
    const process = await learn.getProcess(req.params.classId, req.params.contentId, req.params.userId)
    res.send(process)
})

router.post('/create/:classId/:contentId/:userId', async function (req, res, next) {
    // await learn.setProcess(1, 4, "ileilliat@gmail.com", "2022-04-05 08:17:49", "학습 완료", 100, "마지막 학습")
    // TODO: create 함수 구현
    res.send({result: true})
})

router.post('/update/:classId/:contentId/:userId', async function (req, res, next) {
    // await learn.setProcess(1, 4, "ileilliat@gmail.com", "2022-04-05 08:17:49", "학습 완료", 100, "마지막 학습")
    // TODO: update 함수 구현
})


module.exports = router