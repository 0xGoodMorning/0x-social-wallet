import { useContext } from 'react'
import { AccountContext } from '@/contexts/accountContext'

export default function useNetwork() {
  const context = useContext(AccountContext)

  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider')
  }

  return context
}
