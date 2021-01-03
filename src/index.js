import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Drizzle } from '@drizzle/store';

// Import contract
import CarOwnershipToken from './car-ownership-contract/build/contracts/CarOwnershipToken.json';

const options = {
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545',
    },
  },
  contracts: [CarOwnershipToken],
};

const drizzle = new Drizzle(options);

ReactDOM.render(<App drizzle={drizzle} />, document.getElementById('root'));
