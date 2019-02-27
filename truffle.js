require("dotenv").config();
require("babel-register");
require("babel-polyfill");

const PrivateKeyProvider = require("truffle-privatekey-provider");
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic =
  "hope awesome inherit detect employ busy popular clip olive fork better glare";

module.exports = {
  build: require("./build"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: () =>
        new PrivateKeyProvider(
          process.env.REACT_APP_RINKEBY_KEY,
          `https://rinkeby.infura.io/${process.env.REACT_APP_INFURA_KEY}`
        ),
      network_id: 15
    }
  }
};
