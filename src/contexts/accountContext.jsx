import React, { createContext, useCallback, useMemo, useState } from 'react'

const AccountContext = createContext({
  account: {},
})

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState({})

  const updateAccount = useCallback((accProps) => {
    setAccount((acc) => ({
      ...acc,
      ...accProps
    }))
  }, [])

  const resetAccount = useCallback(() => {
    setAccount({})
  }, [])

  const isAccountEmpty = useMemo(() => Object.keys(account).length, [account])

  const isOwnerOfTheAccount = useMemo(() => account.token, [account.token])

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
