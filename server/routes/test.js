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
            console.log(pcs)
        } catch (err) {
            console.log(err)
        }
        return pcs;
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
            console.log(process)
        } catch (err) {
            console.log(err)
        }
        return process;
    }

    async getProcessByKey(key) {
        let process
        try {
            const instance = await this.Learn.deployed()
            process = await instance.readByKey.call(key)
            console.log(process)
        } catch (err) {
            console.log(err)
        }
        return process;
    }
}

const learn = new Learn()

router.get('/', async function (req, res, next) {
    // const accounts = await adopt.getAccounts()
    // await learn.setProcess(1, 4, "ileilliat@gmail.com", "2022-04-05 08:17:49", "학습 완료", 100, "마지막 학습")
    // const processes = await learn.getAllProcess()
    // res.send(processes)

    //const process = await learn.getProcess(1, 4, "ileilliat@gmail.com")
    const process = await learn.getProcessByKey("0xc1c5e514f88bdd1e80be0c403bed332590f9fb8b1ba233ecb693d5178830fb60")
    res.send(process) // 없는 값 - ["","","0",""]
    // TODO: for - in 구문으로 각 process는 {}로 바꾸는 과정 필요
    // TODO: process 배열 반환하는 경우 [{p1}, {p2}, ...] 형식 사용
})

/* 결과 setProcess 결과 예시
{
  tx: '0xf71575839d957f24ce123a2c642c1ba0a8cf8758a933f57deab5582fca519058',
  receipt: {
    transactionHash: '0xf71575839d957f24ce123a2c642c1ba0a8cf8758a933f57deab5582fca519058',
    transactionIndex: 0,
    blockHash: '0xc1c5e514f88bdd1e80be0c403bed332590f9fb8b1ba233ecb693d5178830fb60',
    blockNumber: 143,
    from: '0x8ff0792d265281edcd05766a43150f5291148cb5',
    to: '0x10df69536d0cbca5f625f1dc28674f7ffad1475f',
    gasUsed: 262207,
    cumulativeGasUsed: 262207,
    contractAddress: null,
    logs: [],
    status: true,
    logsBloom: '0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
    rawLogs: []
  },
  logs: []
}
 */

module.exports = router