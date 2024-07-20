import { ScrollArea, ScrollBar } from './components/ui/scroll-area'
import { ThemeProvider } from './contexts/ThemeProvider'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { Transactions } from './pages/transactions'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TransactionsProvider>
        <ScrollArea>
          <Transactions />
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </TransactionsProvider>
    </ThemeProvider>
  )
}
