import React, { Component } from 'react';

import './App.css';
import Result from './Result';
import { getTokenInstance } from './utils';

class App extends Component {
  state = { loading: true, tokenInstance: undefined };

  componentDidMount() {
    getTokenInstance()
      .then((tokenInstance) => this.setState({ loading: false, tokenInstance }))
      .catch((err) => console.log('debug error', err));
  }

  render() {
    if (this.state.loading) return 'Loading Application...';

    return <Result tokenInstance={this.state.tokenInstance} />;
  }
}

export default App;
