export default function handler(req, res) {
    const { frontend_key_address, social_handle, social_token } = req.body

    // TODO:

    // validate social_token against social_handle

    // change FrontendKey of wallet

    // deploy contract to receiver wallet address

    res.status(200).json({
        success: true
    })
}