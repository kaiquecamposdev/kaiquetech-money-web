import { ThemeProvider } from './contexts/ThemeProvider'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/transactions'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}
