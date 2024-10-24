import { ThemeProvider } from './theme-provider'
import { TransactionsProvider } from './transactions-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TransactionsProvider>{children}</TransactionsProvider>
    </ThemeProvider>
  )
}
