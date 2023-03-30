import { getDb } from '../../lib/db'

export default async function handler(req, res) {
    const { frontendKeyAddress, socialHandle, socialHandleType } = req.body
    const count = await getDb().collection('handlers').count()

    console.log({ count })

    // TODO:
    // check if there is an existing wallet for that handle and 
    // return it if it exists or calc generate a new wallet and assign it to that handle
    // then store it in the DB

    res.status(200).json({
        // dummy response
        address: "0x0000000000000000000000000000000000000789"
    })
}
