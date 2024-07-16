import dayjs from 'dayjs'
import { useContextSelector } from 'use-context-selector'

import { Header } from '@/components/header'
import { Summary } from '@/components/summary'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TransactionsContext } from '@/contexts/TransactionsContext'
import { Searching } from '@/icons/searching'
import { cn } from '@/lib/utils'
import { CreatePagination } from '@/utils/create-pagination'
import { formatCurrency } from '@/utils/format-currency'

export function Transactions() {
  const { filteredTransactions, page, isLoading } = useContextSelector(
    TransactionsContext,
    ({ filteredTransactions, page, isLoading }) => {
      return {
        filteredTransactions,
        page,
        isLoading,
      }
    },
  )

  const paginatedTransactions = CreatePagination(filteredTransactions)

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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedTransactions[page].map(
                    ({ id, description, price, type, category, createdAt }) => {
                      return (
                        <TableRow key={id} className="bg-card p-2">
                          <TableCell>{description}</TableCell>
                          <TableCell>
                            <span
                              className={cn(
                                'text-base',
                                type === 'outcome'
                                  ? 'text-red-500'
                                  : 'text-green-500',
                              )}
                            >
                              {type === 'outcome'
                                ? formatCurrency(-price)
                                : formatCurrency(price)}
                            </span>
                          </TableCell>
                          <TableCell>{category}</TableCell>
                          <TableCell>
                            {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
                          </TableCell>
                        </TableRow>
                      )
                    },
                  )}
                </TableBody>
              </Table>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
