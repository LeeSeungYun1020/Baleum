const express = require('express');
const router = express.Router();
const classController = require('../controller/classController')
const classCategoryController = require('../controller/classCategoryController')
const takingClassController = require('../controller/takingClassController')
const noticeController = require('../controller/noticeController')
const processController = require('../controller/processController')
const contentController = require('../controller/contentController')

router.get('/info/:classId', classController.getClass)

router.get('/list/:num', classController.list)
router.get('/all', (req, res) => {
    res.redirect("/class/list/15")
})
router.get('/main', (req, res) => {
    res.redirect("/class/list/8")
})
router.get('/category/list', classCategoryController.getCategory)
router.get('/category/:classCategory', classController.categoryList)
router.get('/search/:query', classController.search)
router.get('/my', classController.myTakingClass)
router.get('/my/teach', classController.myTeachingClass)
router.post('/create', classController.create)
router.post('/update/:id', classController.update)
router.delete('/delete/:id', classController.delete)

router.get('/isBefore/:classId', takingClassController.isBefore)
router.post('/enrol/:classId', takingClassController.enrol)

router.get('/notice/class/:classId', noticeController.list)
router.post('/notice/create', noticeController.create)
router.post('/notice/update/:id', noticeController.update)
router.get('/notice/read/:id', noticeController.read)
router.delete('/notice/delete/:id', noticeController.delete)

router.get('/process/:userId/:classId', processController.list)

router.post('/contents/:classId/add', contentController.add)
router.get('/contents/:classId/:contentId', contentController.get)
router.get('/contents/:classId', contentController.list)

router.post('/done/video', processController.videoDone)
router.post('/done/test', processController.testDone)
// TODO: 문제 테스트 부분 개정 필요
router.post('/done/test/score', processController.testDone)

router.get('/complete/list/:userId', takingClassController.completedList)
router.get('/complete/:userId/:classId', takingClassController.isCompleted)

module.exports = router;
