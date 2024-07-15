import '@/globals.css'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/transactions'

export function App() {
  return (
    <TransactionsProvider>
      <Transactions />
    </TransactionsProvider>
  )
}
