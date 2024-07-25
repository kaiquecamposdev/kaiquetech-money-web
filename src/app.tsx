import { Toaster } from 'sonner'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { ThemeProvider } from './contexts/ThemeProvider'
import { TransactionsProvider } from './contexts/TransactionsContext'
import { Home } from './pages/home'

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TransactionsProvider>
        <ScrollArea>
          <Home />
          <Toaster richColors />
          <ScrollBar orientation="vertical" />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </TransactionsProvider>
    </ThemeProvider>
  )
}
