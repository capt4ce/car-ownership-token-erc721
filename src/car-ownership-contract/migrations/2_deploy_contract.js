var CarOwnershipToken = artifacts.require('CarOwnershipToken');

module.exports = function (deployer) {
  deployer.deploy(CarOwnershipToken);
};
