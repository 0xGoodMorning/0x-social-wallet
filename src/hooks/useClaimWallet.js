import { useState } from 'react'

import { Wallet } from 'ethers'

import { fetchPost } from '@/helpers/fetch'

export default function useCreateWallet() {
  const [err, setErr] = useState('')
  const [inProgress, setInProgress] = useState(false)

  const wrapProgress = async (fn, type = true) => {
    setInProgress(type)
    try {
      return await fn()
    } catch (e) {
      setAddAccErr(`Unexpected error: ${e.message || e}`)
    }
    setInProgress(false)
  }

  const wrapErr = async (fn) => {
    setAddAccErr('')
    try {
      await fn()
    } catch (e) {
      setInProgress(false)
      setAddAccErr(`Unexpected error: ${e.message || e}`)
    }
  }

  const claimWallet = async ({ socialHandle, socialHandleType = 'twitter' }) => {
    setErr('')

    // TODO: impl here the fetch of the JWT from the Twitter API
    const socialToken = 'JWT returned from the twitter api that should be called and awaited here'

    if (!socialToken) {
      setErr('Twitter authentication failed!')
      throw new Error(`Twitter authentication failed`)
    }

    const frontendKeyWallet = Wallet.createRandom({ extraEntropy })

    const frontendKeyAddress = frontendKeyWallet.address

    const claimWalletRes = await fetchPost(`api/claim`, { frontendKeyAddress, socialHandle, socialHandleType, socialToken })

    if (!claimWalletRes.success)
    throw new Error(
      `Internal error when claiming your wallet: ${claimWalletRes.message || claimWalletRes}`
    )

    console.log('claimWalletRes', claimWalletRes)
  }

  const handleClaimWallet = async ({ socialHandle, socialHandleType }) => {
    return await wrapProgress(() => claimWallet({ socialHandle, socialHandleType }), true)
  }

  return { handleClaimWallet, wrapErr, wrapProgress, err, addAccErr, inProgress }
}
