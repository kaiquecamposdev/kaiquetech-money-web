import { useContextSelector } from 'use-context-selector'

import { Header } from '@/components/home/header'
import { Summary } from '@/components/home/summary'
import { NotFound } from '@/components/not-found'
import { TransactionsTable } from '@/components/table/transactions-table'
import { TransactionsContext } from '@/contexts/TransactionsContext'

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
        <main className="flex min-h-screen flex-col gap-6">
          <Summary />
          <section className="flex w-full flex-col gap-4">
            {isLoading ? <NotFound /> : <TransactionsTable />}
          </section>
        </main>
      </div>
    </div>
  )
}
