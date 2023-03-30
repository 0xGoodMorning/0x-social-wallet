const config = {
  salt: '0x0000000000000000000000000000000000000000000000000000000000000001',
  identityFactoryAddr: process.env.WALLET_FACTORY_ADDRESS,
  baseIdentityAddr: process.env.BASE_WALLET_ADDRESS,
  quickAccManager: process.env.MANAGER_ADDRESS,
  quickAccTimelock: process.env.MANAGER_TIMELOCK,
}

export default config
