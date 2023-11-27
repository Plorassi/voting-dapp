// Migrations variable has an instance of Migrations.sol contract
var Migrations = artifacts.require("./Migrations.sol");

// Information for truffle to deploy Migrations contract
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
