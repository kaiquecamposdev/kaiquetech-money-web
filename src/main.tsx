import '@/globals.css'

import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'

import { App } from './app'
import { ScrollArea, ScrollBar } from './components/ui/scroll-area'
import { LayoutRoot } from './layout'
import { Providers } from './providers/providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LayoutRoot>
    <Providers>
      <ScrollArea>
        <App />
        <Toaster richColors />
        <ScrollBar orientation="vertical" />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Providers>
  </LayoutRoot>,
)
