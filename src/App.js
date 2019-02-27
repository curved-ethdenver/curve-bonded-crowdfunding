import React, { Component } from "react";
import Web3 from "web3";

import getWeb3 from "./utils/getWeb3";
// import getPortisWeb3 from "./utils/getPortisWeb3";

import Header from "./components/Header/Header.jsx";
import LaunchForm from "./components/LaunchForm/LaunchForm.jsx";
import "./App.css";

class App extends Component {
  state = { web3: null, networkId: null, accounts: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();
      const accounts = await web3.eth.getAccounts();

      this.setState({ web3, networkId, accounts });
      console.log(networkId);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        <LaunchForm />
      </div>
    );
  }
}

export default App;
