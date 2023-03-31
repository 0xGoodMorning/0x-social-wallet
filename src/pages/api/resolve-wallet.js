import { getDb } from '../../lib/db'
import { getProxyDeployBytecode } from '../../lib/IdentityProxyDeploy'
import { AbiCoder, keccak256, id, getAddress } from 'ethers/lib/utils'
import * as ethers from 'ethers'
import { generateAddress2 } from 'ethereumjs-util'

const salt = '0x0000000000000000000000000000000000000000000000000000000000000001'
const identityFactoryAddr = process.env.WALLET_FACTORY_ADDRESS
const baseIdentityAddr = process.env.BASE_WALLET_ADDRESS
const quickAccManager = process.env.MANAGER_ADDRESS
const quickAccTimelock = process.env.MANAGER_TIMELOCK

const walletsCol = getDb().collection('wallets')

export default async function handler(req, res) {
    const { frontendKeyAddress, socialHandle, socialHandleType } = req.body
    // const count = await getDb().collection('handlers').count()

    // check if there is an existing wallet for that handle and 
    // return it if it exists or calc generate a new wallet and assign it to that handle
    // then store it in the DB
    let walletAddr
    const wallets = await walletsCol.find({ socialHandle: socialHandle}).toArray()
    if (wallets.length > 0) {
        walletAddr = wallets[0]._id
    } else {
        const extraEntropy = id(`${socialHandleType}:${socialHandle}:${Date.now()}:${Math.random()}`)
        const backendKeyPassword = ethers.Wallet.createRandom({ extraEntropy }).mnemonic.phrase.split(' ').slice(0, 6).join(' ') + ' ' + `${socialHandleType}:${socialHandle}`
        const backendWallet = await ethers.utils.HDNode.fromMnemonic(process.env.BACKEND_KEY_MNEMONIC, backendKeyPassword)

        const quickAccountTuple = [quickAccTimelock, frontendKeyAddress, backendWallet.address]

        const abiCoder = new AbiCoder()
        const accHash = keccak256(abiCoder.encode(['tuple(uint, address, address)'], [quickAccountTuple]))
        const privileges = [[quickAccManager, accHash]]
        const bytecode = getProxyDeployBytecode(baseIdentityAddr, privileges, { privSlot: 0 })
        walletAddr = getAddress('0x' + generateAddress2(
            // Converting to buffer is required in ethereumjs-util version: 7.1.3
            Buffer.from(identityFactoryAddr.slice(2), 'hex'),
            Buffer.from(salt.slice(2), 'hex'),
            Buffer.from(bytecode.slice(2), 'hex')
        ).toString('hex'))

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
            backendKeyPassword,
            timelock: quickAccTimelock
        })
    }

    res.status(200).json({
        address: walletAddr
    })
}
