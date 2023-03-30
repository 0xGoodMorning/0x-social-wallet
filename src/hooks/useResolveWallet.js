import { useState } from 'react'

import { Wallet } from 'ethers'
import {  id } from 'ethers/lib/utils'

import { fetchPost } from '@/helpers/fetch'

export default function useCreateWallet() {
  const [err, setErr] = useState('')
  const [addAccErr, setAddAccErr] = useState('')
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

  const resolveWallet = async ({ socialHandle, socialHandleType = 'twitter' }) => {
    setErr('')
    // async hack to let React run a tick so it can re-render before the blocking Wallet.createRandom()
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 0))

    const extraEntropy = id(
      `${socialHandle}:${Date.now()}:${Math.random()}:${
        typeof performance === 'object' && performance.now()
      }`
    )
    const frontendKeyWallet = Wallet.createRandom({ extraEntropy })

    const frontendKeyAddress = frontendKeyWallet.address

    const resolveWalletRes = await fetchPost(`api/resolve-wallet`, { frontendKeyAddress, socialHandle, socialHandleType })

    if (!resolveWalletRes.address)
    throw new Error(
      `resolve-wallet returned no address, error: ${resolveWalletRes.message || resolveWalletRes}`
    )
    
    console.log('resolveWalletRes: ', resolveWalletRes)

    return resolveWalletRes

    // TODO: create user record in the local storage
  }

  const handleResolveWallet = async ({ socialHandle, socialHandleType }) => {
    return await wrapProgress(() => resolveWallet({ socialHandle, socialHandleType }), true)
  }

  return { handleResolveWallet, wrapErr, wrapProgress, err, addAccErr, inProgress }
}
