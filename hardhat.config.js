require("@nomicfoundation/hardhat-toolbox");
const config = require('dotenv').config({path: '.env.local'});

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "sepolia",
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
        // details: {
        //     yul: false
        // }
      },
      outputSelection: {
        "*": {
          "*": ["abi", "metadata", "storageLayout"]
        }
      },
    //   viaIR: true,
    },
  },
  networks: {
    hardhat: {
        //   
    },
    sepolia: {
        chainId: 11155111,
        url: config.parsed.RPC_URL,
        accounts: [config.parsed.HARDHAT_PRIVATE_KEY],
    },
  },
  paths: {
    sources: "./src/contracts",
    tests: "./hardhat/test",
    cache: "./hardhat/cache",
    artifacts: "./src/contracts/artifacts"
  },
};
