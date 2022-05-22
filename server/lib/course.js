const truffleContract = require('truffle-contract')
const courseJson = require('../build/contracts/Course.json')
const web3Lib = require('./web3')
const connection = require("./mysql")

class Course {
    constructor() {
        this.web3 = web3Lib.getWeb3()
        this.GAS_LIMIT = 1000000
        this.Course = truffleContract(courseJson)
        this.Course.setProvider(this.web3.currentProvider)
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

    async getAllClass() {
        let cls = []
        try {
            const instance = await this.Course.deployed()
            cls = await instance.readAll.call()
        } catch (err) {
            console.error(err)
        }

        const array = []
        for (const value of cls) {
            const class1 = {}
            for (const key in value) {
                if ("0" <= key && key <= "9")
                    continue
                class1[key] = value[key]
            }
            array.push(class1)
        }

        return array
    }

    async setClass(userId, classId, completedDate, name, detail, teacher, category) {
        const stringDate = completedDate.toString()
        let result
        try {
            const instance = await this.Course.deployed()
            const accounts = await this.getAccounts()
            result = await instance.save(userId, classId, stringDate, name, detail, teacher, category, {
                from: accounts[0],
                gasLimit: this.GAS_LIMIT
            })
            connection.query(`UPDATE takingClass
                              SET isSaved         = true,
                                  blockHash       = ?,
                                  transactionHash = ?
                              WHERE classId = ?
                                AND userId = ?
                                AND isCompleted = true`, [result.receipt.blockHash, result.receipt.transactionHash, classId, userId], async (err) => {
                if (err)
                    console.error(err.message)
            })
        } catch (err) {
            console.log(err)
        }
        return result
    }

    async getClass(userId, classId) {
        let class1
        try {
            const instance = await this.Course.deployed()
            class1 = await instance.read.call(userId, classId)
        } catch (err) {
            console.error(err)
        }

        const result = {}
        result["userId"] = userId
        result["classId"] = classId
        for (const key in class1) {
            if ("0" <= key && key <= "9")
                continue
            result[key] = class1[key]
        }
        return result
    }
}

module.exports = Course
