const Adoption = artifacts.require("Adoption");
const Learn = artifacts.require("Learn");

module.exports = (deployer) => {
    deployer.deploy(Learn);
    deployer.deploy(Adoption);
};