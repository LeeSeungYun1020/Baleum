const web3 = require('web3');
const truffleConfig = require('../truffle-config');

module.exports = {
    getWeb3: () => {
        const network = truffleConfig.networks['development']
        if (network.provider) { // 테스트넷
            return new web3(network.provider)
        } else { // 로컬, 가나슈
            return new web3(new web3.providers.HttpProvider(`http://${network.host}:${network.port}`))
        }
    }
}