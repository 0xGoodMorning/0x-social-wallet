import { getDb } from '../../lib/db'
import { id, getAddress } from 'ethers/lib/utils'
import * as ethers from 'ethers'

const walletsCol = getDb().collection('wallets')

export default async function handler(req, res) {
    const { frontendKeyAddress, socialHandle, socialHandleType } = req.body
    // const count = await getDb().collection('handlers').count()

    // TODO:
    // check if there is an existing wallet for that handle and 
    // return it if it exists or calc generate a new wallet and assign it to that handle
    // then store it in the DB
    let walletAddr
    const wallets = await walletsCol.find({ socialHandle: socialHandle}).toArray()
    if (wallets.length > 0) {
        walletAddr = wallets[0]._id
    } else {
        const salt = '0x0000000000000000000000000000000000000000000000000000000000000001'

        // TODO: calc bytecode and wallet address
        const bytecode = '0x0'
        walletAddr = '0x0000000000000000000000000000000000000789'
    
        const extraEntropy = id(`${socialHandleType}:${socialHandle}:${Date.now()}:${Math.random()}`)
        const backendKeyPassword = ethers.Wallet.createRandom({ extraEntropy }).mnemonic.phrase.split(' ').slice(0, 6).join(' ') + ' ' + `${socialHandleType}:${socialHandle}`
        const backendWallet = await ethers.utils.HDNode.fromMnemonic(process.env.BACKEND_KEY_MNEMONIC, backendKeyPassword)
    
        // create receiver wallet account in DB
        await walletsCol.insertOne({
            _id: walletAddr,
            created: new Date(),
            salt,
            bytecode,
            socialHandleType,
            socialHandle,
            frontendKeyAddress: getAddress(frontendKeyAddress),
            backendKeyAddress: backendWallet.address,
            backendKeyPassword
        })
    }

    res.status(200).json({
        address: '0x0000000000000000000000000000000000000789'
    })
}
