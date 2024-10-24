import { useContextSelector } from 'use-context-selector'

import { Summary } from './components/home/summary'
import { TransactionsTable } from './components/home/tables/transactions-table'
import { Loading } from './components/loading'
import { cn } from './lib/utils'
import { TransactionsContext } from './providers/transactions-provider'

export function App() {
  const { isLoading } = useContextSelector(
    TransactionsContext,
    ({ isLoading }) => {
      return {
        isLoading,
      }
    },
  )

  return (
    <main className="flex items-center justify-center bg-background px-6 py-12">
      <div className="w-full max-w-7xl flex-col gap-6">
        <Summary />
        <section
          className={cn(
            'flex w-full flex-1 flex-col gap-4',
            isLoading ? 'items-center justify-center' : 'items-start',
          )}
        >
          {isLoading ? <Loading /> : <TransactionsTable />}
        </section>
      </div>
    </main>
  )
}
