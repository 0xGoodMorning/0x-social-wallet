import { getDb } from '../../lib/db'

export default async function handler(req, res) {
    const { frontend_key_address, social_handle } = req.body
    const count = await getDb().collection('handlers').count()

    console.log({ count })

    // TODO:

    // calc receiver wallet address

    // create receiver wallet account in DB

    res.status(200).json({
        // dummy response
        receiver_address: "0x0000000000000000000000000000000000000789"
    })
}