const express = require('express')
const router = express.Router()
const truffleContract = require('truffle-contract')
const adoptJson = require('../build/contracts/Adoption.json')
const web3Lib = require('../lib/web3')

class Adopt {
    constructor() {
        this.web3 = web3Lib.getWeb3()
        this.GAS_LIMIT = 1000000
        this.Adopt = truffleContract(adoptJson)
        this.Adopt.setProvider(this.web3.currentProvider)
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

    getAdopt() {
        let adoptInstance
        this.Adopt.deployed().then((instance) => {
            adoptInstance = instance
            return adoptInstance.getAdopters.call()
        }).then((adopters) => {
            console.log(adopters)
            return adopters
        }).catch((e) => {
            console.error(e.message)
        })
    }
}

const adopt = new Adopt()

router.get('/', function (req, res, next) {
    // const accounts = await adopt.getAccounts()
    const accounts = adopt.getAdopt()
    res.send(accounts)
})

module.exports = router