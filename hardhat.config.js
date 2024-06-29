require('@nomiclabs/hardhat-waffle')
require('dotenv').config()

module.exports = {
  defaultNetwork: 'polygon',
  networks: {
    polygon: {
      url: 'https://endpoints.omniatech.io/v1/matic/mumbai/public',
      accounts: ['13e8d6012facd7a62aeb70a2b8217ab0c4fed27ca81fdd2bdcf29c4b08c1b3db']
    },
<<<<<<< HEAD
    goerli: {
      url: "https://goerli.infura.io/v3/30f2472011e445d29bc3689063eec747",
      accounts: ["13e8d6012facd7a62aeb70a2b8217ab0c4fed27ca81fdd2bdcf29c4b08c1b3db"]
    },
    // Agroblockchain: {
    //   url: "http://localhost:8545",
    //   accounts: ["3b5001c0ecdeb6dc367eb25b24f19d2977e4abda2e34f27489cc5af2d5a4fb0c"]
    // },
=======
>>>>>>> e59ba69e2a5bd17b478813ca6913a49e94d2a7eb
  },
  solidity: {
    version: '0.8.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: './src/contracts',
    artifacts: './src/abis',
  },
  mocha: {
    timeout: 40000,
  },
}
