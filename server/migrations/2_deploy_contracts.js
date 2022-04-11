const Learn = artifacts.require("Learn");
const Course = artifacts.require("Course");

module.exports = (deployer) => {
    deployer.deploy(Learn);
    deployer.deploy(Course);
};