const CarOwnershipToken = artifacts.require('CarOwnershipToken');

contract('Car Ownership Token', (accounts) => {
  it('Should make first account an owner', async () => {
    let instance = await CarOwnershipToken.deployed();
    let owner = await instance.owner();
    console.log('accounts', accounts);
    assert.equal(owner, accounts[0]);
  });
});
