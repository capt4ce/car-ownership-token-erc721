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

const mintToken = async (
  tokenInstance,
  tokenObjectArray = [],
  sender,
  gas = 1700000
) => {
  await tokenInstance.mint(
    tokenObjectArray[0], // code
    tokenObjectArray[1], // img
    {
      from: sender,
      gas,
    }
  );
  return { code: tokenObjectArray[0], img: tokenObjectArray[1] };
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
      return {
        ...(await tokenInstance.getCar(token)),
        // id: new Web3.utils.BN(token).toString(),
        tokenId: token,
        tokenIdStr: token.toString(),
      };
    })
  );
  const finalResult = await Promise.all(
    result.map(async (car) => {
      return {
        ...car,
        owner: await tokenInstance.ownerOf(car.tokenId),
      };
    })
  );
  return finalResult;
};

export { getProvider, getTokenInstance, mintToken, fetchTokens };
