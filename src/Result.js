import React, { Component } from 'react';
import { newContextComponents } from '@drizzle/react-components';
import { mintToken, fetchTokens } from './utils';

const { ContractData, ContractForm } = newContextComponents;

class Result extends Component {
  state = {
    accounts: undefined,
    isLoadingFetchTokens: true,
    fetchedTokens: undefined,
    isLoadingMintToken: true,
    carCodeInput: '',
    carImageInput: '',
  };

  componentDidMount = async () => {
    if (!window.ethereum) return;

    const accounts = await this.getAccountsFromMetamask();
    if (Array.isArray(accounts) && accounts.length > 0) {
      await this.fetchTokens(accounts[0]);
    }
  };

  getAccountsFromMetamask = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    this.setState({ accounts });
    return accounts;
  };

  fetchTokens = async (owner) => {
    const { tokenInstance } = this.props;
    this.setState({ isLoadingFetchTokens: true });
    try {
      const fetchedTokens = await fetchTokens(tokenInstance, owner);
      this.setState({ isLoadingFetchTokens: false, fetchedTokens });
    } catch (err) {
      console.log('debug fetch tokens', err);
      this.setState({ isLoadingFetchTokens: false });
    }
  };

  mintToken = async () => {
    const { tokenInstance } = this.props;
    const { accounts, carCodeInput, carImageInput } = this.state;

    if (!Array.isArray(accounts) || accounts.length == 0) return;

    const carAttributes = [
      carCodeInput, // code
      carImageInput, // img
    ];

    try {
      await mintToken(tokenInstance, carAttributes, accounts[0]);
    } catch (err) {
      console.log('debug error mint', err);
    }
  };

  render() {
    if (!window.ethereum) return 'No metamask is connected';
    const { tokenInstance } = this.props;
    const { fetchedTokens } = this.state;

    return (
      <div className="App">
        <div style={{ marginTop: '50px' }}>
          All Tokens:{' '}
          <div>
            {Array.isArray(fetchedTokens) &&
              fetchedTokens.map((token) => <p>{JSON.stringify(token)}</p>)}
          </div>
          <br />
          <br />
          <div>
            <div>
              Car code:
              <div>
                <input
                  onChange={(e) => {
                    this.setState({ carCodeInput: e.target.value });
                  }}
                />
              </div>
            </div>
            <div>
              Car image:
              <div>
                <input
                  onChange={(e) => {
                    this.setState({ carImageInput: e.target.value });
                  }}
                />
              </div>
            </div>
            <button onClick={this.mintToken}>Mint a new token</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;
