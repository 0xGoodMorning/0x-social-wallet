import { providers } from 'ethers'

function getProvider(rpcUrl, networkName, chainId) {
	return rpcUrl.startsWith('wss:')
        ? new providers.WebSocketProvider(rpcUrl, { networkName, chainId })
        : new providers.StaticJsonRpcProvider(rpcUrl, { networkName, chainId })
}

module.exports = {
    getProvider
}