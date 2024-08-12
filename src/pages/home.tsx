import { useContextSelector } from 'use-context-selector'

import { Header } from '@/components/home/header'
import { Summary } from '@/components/home/summary'
import { TransactionsTable } from '@/components/home/table/transactions-table'
import { Loading } from '@/components/loading'
import { TransactionsContext } from '@/contexts/TransactionsContext'
import { cn } from '@/lib/utils'

export function Home() {
  const { isLoading } = useContextSelector(
    TransactionsContext,
    ({ isLoading }) => {
      return {
        isLoading,
      }
    },
  )

  return (
    <div className="relative flex flex-col items-center bg-background before:absolute before:left-0 before:top-0 before:z-[-1] before:min-h-[calc(45px+(24px*2))] before:w-full before:bg-foreground">
      <div className="w-full max-w-6xl px-6">
        <Header />
        <main className="flex min-h-[calc(100dvh-48px*2)] flex-col gap-6">
          <Summary />
          <section
            className={cn(
              'flex w-full flex-1 flex-col gap-4',
              isLoading ? 'items-center justify-center' : 'items-start',
            )}
          >
            {isLoading ? <Loading /> : <TransactionsTable />}
          </section>
        </main>
      </div>
    </div>
  )
}
