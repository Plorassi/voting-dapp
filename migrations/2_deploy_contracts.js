// Election variable is an instance of Election.sol contract
var Election = artifacts.require("./Election.sol");

// Information for truffle to deploy Election contract
module.exports = function(deployer) {
  deployer.deploy(Election);
};
