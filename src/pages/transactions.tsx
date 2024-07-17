import { useContextSelector } from 'use-context-selector'

import { Header } from '@/components/header'
import { Summary } from '@/components/summary'
import { TransactionsTable } from '@/components/transactionsTable'
import { TransactionsContext } from '@/contexts/TransactionsContext'
import { Searching } from '@/icons/searching'

export function Transactions() {
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
      <div className="w-full max-w-[1120px] px-6">
        <Header />
        <main className="flex min-h-screen flex-col gap-6">
          <Summary />
          <section className="flex w-full flex-col gap-4">
            {isLoading ? (
              <section className="mt-16 flex w-full flex-col items-center justify-center gap-3">
                <Searching className="h-40 w-40 text-primary" />
                <h2 className="text-muted-foreground">
                  Carregando transações...
                </h2>
              </section>
            ) : (
              <TransactionsTable />
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
