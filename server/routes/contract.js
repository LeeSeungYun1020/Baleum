const express = require('express')
const router = express.Router()
const truffleContract = require('truffle-contract')
const learnJson = require('../build/contracts/Learn.json')
const web3Lib = require('../lib/web3')

class Learn {
    constructor() {
        this.web3 = web3Lib.getWeb3()
        this.GAS_LIMIT = 1000000
        this.Learn = truffleContract(learnJson)
        this.Learn.setProvider(this.web3.currentProvider)
    }

    async getAccounts() {
        let accounts
        try {
            accounts = await this.web3.eth.getAccounts()
        } catch (e) {
            console.error(e)
        }

        if (!accounts) {
            console.error("계정 불러오기 실패, 이더리움 클라이언트 확인")
        }

        return accounts
    }

    async getAllProcess() {
        let pcs = []
        try {
            const instance = await this.Learn.deployed()
            pcs = await instance.readAll.call()
        } catch (err) {
            console.error(err)
        }

        const array = []
        for (const value of pcs) {
            const process = {}
            for (const key in value) {
                if ("0" <= key && key <= "9")
                    continue
                process[key] = value[key]
            }
            array.push(process)
        }

        return array;
    }

    async setProcess(classId, contentId, userId, date, state, score, feedback) {
        let result
        try {
            const instance = await this.Learn.deployed()
            const accounts = await this.getAccounts()
            result = await instance.save(classId, contentId, userId, date, state, score, feedback, {from: accounts[0]})
            console.log(result)
            console.log("Fin trans")
        } catch (err) {
            console.log(err)
        }
        return result;
    }

    async getProcess(classId, contentId, userId) {
        let process
        try {
            const instance = await this.Learn.deployed()
            process = await instance.read.call(classId, contentId, userId)
        } catch (err) {
            console.error(err)
        }

        const result = {}
        result["classId"] = classId
        result["contentId"] = contentId
        result["userId"] = userId
        for (const key in process) {
            if ("0" <= key && key <= "9")
                continue
            result[key] = process[key]
        }
        return result;
    }
}

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

router.post('/update/:classId/:contentId/:userId', async function (req, res, next) {
    // await learn.setProcess(1, 4, "ileilliat@gmail.com", "2022-04-05 08:17:49", "학습 완료", 100, "마지막 학습")
    // TODO: update 함수 구현
})


module.exports = router