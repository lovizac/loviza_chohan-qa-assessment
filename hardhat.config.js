require('dotenv').config();
require("@nomiclabs/hardhat-waffle");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "YOUR_PRIVATE_KEY_HERE";

module.exports = {
  solidity: "0.8.6",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/4364d9593a0f4c708079bb69f285d4ab`,
      accounts: [PRIVATE_KEY]
    }
  }
};



