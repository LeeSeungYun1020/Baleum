const express = require('express')
const router = express.Router()
const Learn = require('../lib/learn')
const Course = require('../lib/course')

const learn = new Learn()
const course = new Course()

router.get('/', async function (req, res) {
    res.send("Use /contract/process or class/all")
})

router.get('/process/all', async function (req, res) {
    const processes = await learn.getAllProcess()
    res.send(processes)
})

router.get('/process/read/:classId/:contentId/:userId', async function (req, res) {
    const process = await learn.getProcess(req.params.classId, req.params.contentId, req.params.userId)
    res.send(process)
})

router.get('/class/all', async function (req, res) {
    const processes = await course.getAllClass()
    res.send(processes)
})

router.get('/class/read/:userId/:classId', async function (req, res) {
    const process = await course.getClass(req.params.userId, req.params.classId)
    res.send(process)
})

module.exports = router