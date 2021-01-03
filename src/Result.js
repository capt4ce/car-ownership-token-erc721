import React, { Component } from 'react';
import { Button, FormControl, Row, Col, Card, Form } from 'react-bootstrap';

import { mintToken, fetchTokens } from './utils';
class Result extends Component {
  state = {
    accounts: undefined,
    isLoadingFetchTokens: true,
    fetchedTokens: undefined,
    isLoadingMintToken: true,
    carCodeInput: '',
    carImageInput: '',
    newTokens: [],
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
      const newToken = await mintToken(
        tokenInstance,
        carAttributes,
        accounts[0]
      );
      const newTokensCopy = this.state.newTokens;
      newTokensCopy.push(newToken);
      this.setState({ newTokens: newTokensCopy });
    } catch (err) {
      console.log('debug error mint', err);
    }
  };

  render() {
    if (!window.ethereum) return 'No metamask is connected';
    const { fetchedTokens, newTokens } = this.state;
    console.log('debug fetchedTokens', fetchedTokens);

    return (
      <div className="App">
        <div style={{ marginTop: '50px', marginBottom: '50px' }}>
          <h1>All Car Ownership Token (COT) [ERC-721]:</h1>
          <div style={{ marginLeft: '10px', marginRight: '10px' }}>
            <Row>
              <Col md={9}>
                <Row>
                  {Array.isArray(fetchedTokens) && fetchedTokens.map(CarLayout)}
                  {Array.isArray(newTokens) && newTokens.map(CarLayout)}
                </Row>
              </Col>
              <Col md={3}>
                <Card style={{ marginBottom: '30px' }}>
                  <Card.Header>Mint A New Car</Card.Header>
                  <Card.Body>
                    <Form>
                      <Form.Group>
                        <Form.Label>Card Code</Form.Label>
                        <FormControl
                          onChange={(e) => {
                            this.setState({ carCodeInput: e.target.value });
                          }}
                        />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Car Image</Form.Label>
                        <FormControl
                          onChange={(e) => {
                            this.setState({ carImageInput: e.target.value });
                          }}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={this.mintToken}
                      >
                        Mint a new car
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}

const CarLayout = ({ code, img, tokenIdStr, owner }) => (
  <Col md={3} style={{ marginBottom: '10px' }}>
    <Card>
      <Card.Img src={img} />
      <Card.Body>
        <Card.Title>{code}</Card.Title>
        <p>Car ID: {tokenIdStr}</p>
        <p>Owner: {owner}</p>
        <Button variant="success">Transfer Ownership</Button>
      </Card.Body>
    </Card>
  </Col>
);

export default Result;
