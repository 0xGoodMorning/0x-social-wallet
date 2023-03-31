/* eslint-disable import/no-anonymous-default-export */
import { getToken } from "next-auth/jwt"

export default async (req, res) => {
    const { frontendKeyAddress, socialHandle, socialHandleType, socialToken } = req.body

    // TODO:

    // validate social_token against social_handle

    // change FrontendKey of wallet

    // deploy contract to receiver wallet address

    res.status(200).json({
        success: true,
        session: await getToken({ req }),
    })
}