export default function handler(req, res) {
    const { frontend_key_address, social_handle } = req.body

    // TODO:

    // calc receiver wallet address

    // create receiver wallet account in DB

    res.status(200).json({
        // dummy response
        receiver_address: "0x0000000000000000000000000000000000000789"
    })
}