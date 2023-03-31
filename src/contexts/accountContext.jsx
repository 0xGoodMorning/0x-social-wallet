import React, {createContext, useCallback, useEffect, useMemo, useState} from 'react'
import { useSession } from "next-auth/react"


const AccountContext = createContext({
  account: {},
})

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({})

  const session = useSession();

  const updateAccount = useCallback((accProps) => {
    setAccount((acc) => ({
      ...acc,
      ...accProps
    }))
  }, [])

  useEffect(() => {
    if (session.status !== "authenticated") return

    updateAccount({
      name: session.data.user.name,
      image: session.data.user.image,
    })
  }, [session])

  const resetAccount = useCallback(() => {
    setAccount({})
  }, [])

  const isAccountEmpty = useMemo(() => !Object.keys(account).length, [account])

  const isOwnerOfTheAccount = useMemo(() => !!account.token, [account.token])

  return (
    <AccountContext.Provider
      value={useMemo(
        () => ({ account, isAccountEmpty, isOwnerOfTheAccount, updateAccount, resetAccount }),
        [account, isAccountEmpty, isOwnerOfTheAccount, updateAccount, resetAccount]
      )}
    >
      {children}
    </AccountContext.Provider>
  )
}

export { AccountContext, AccountProvider }
