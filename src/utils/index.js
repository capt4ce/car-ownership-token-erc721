import Web3 from 'web3';
import contract from '@truffle/contract';

import CarOwnershipToken from '../car-ownership-contract/build/contracts/CarOwnershipToken.json';

let provider;
let tokenInstance;

const getProvider = () => {
  if (provider) return provider;
  return new Web3.providers.HttpProvider('http://localhost:7545');
};

const getTokenInstance = async () => {
  if (tokenInstance) return tokenInstance;

  const contractData = contract(CarOwnershipToken);
  contractData.setProvider(getProvider());
  tokenInstance = await contractData.deployed();
  return tokenInstance;
};

const mintToken = (
  tokenInstance,
  tokenObjectArray = [],
  sender,
  gas = 1700000
) => {
  return tokenInstance.mint(
    tokenObjectArray[0], // code
    tokenObjectArray[1], // img
    {
      from: sender,
      gas,
    }
  );
};

const fetchTokens = async (tokenInstance, owner) => {
  const balance = await tokenInstance.balanceOf(owner);
  if (!balance) return [];

  let resultPromise = [];
  for (let i = 0; i < balance; i++) {
    resultPromise.push(await tokenInstance.tokenOfOwnerByIndex(owner, i));
  }
  const tokens = await Promise.all(resultPromise);
  const result = await Promise.all(
    tokens.map(async (token) => {
      return tokenInstance.getCar(token);
    })
  );
  return result;
};

export { getProvider, getTokenInstance, mintToken, fetchTokens };
