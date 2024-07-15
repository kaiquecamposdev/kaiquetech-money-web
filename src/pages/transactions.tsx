import { Header } from '@/components/header'
import { Pagination } from '@/components/pagination'
import { SearchForm } from '@/components/searchForm'
import { Summary } from '@/components/summary'
import { TransactionsContext } from '@/contexts/TransactionsContext'
import { cn } from '@/lib/utils'
import { CreatePagination } from '@/utils/create-pagination'
import { formatCurrency } from '@/utils/format-currency'
import dayjs from 'dayjs'
import { useContextSelector } from 'use-context-selector'

export function Transactions() {
  const { transactions, filteredTransactions, page, isLoading } =
    useContextSelector(
      TransactionsContext,
      ({ transactions, filteredTransactions, page, isLoading }) => {
        return {
          transactions,
          filteredTransactions,
          page,
          isLoading,
        }
      },
    )

  const paginatedTransactions = CreatePagination(filteredTransactions)

  return (
    <div className="relative flex flex-col items-center before:absolute before:bg-background before:top-0 before:left-0 before:z-[-1] before:min-h-[calc(90px + (48px * 2))] before:w-full before:bg-background">
      <div className="w-full max-w-[1120px] px-6">
        <Header />
        <main className="mt-[calc(16.2px - 2.98px - (10.24px * 2))] min-h-screen">
          <div className="flex flex-col gap-6 md:gap-16">
            <Summary />
            <section className="flex flex-col gap-4 w-full">
              <div className="none md:flex md:flex-col">
                <p>Descrição</p>
                <p>Preço</p>
                <p>Categoria</p>
                <p>Data</p>
              </div>
              <SearchForm />
              <table className="w-full border-collapse border-spacing-x-2">
                <tbody>
                  <tr>
                    <td width="100%" align="center">
                      Carregando transações...
                    </td>
                  </tr>
                  {isLoading ? (
                    <tr>
                      <td width="100%" align="center">
                        Carregando transações...
                      </td>
                    </tr>
                  ) : (
                    paginatedTransactions[page].map(
                      ({
                        id,
                        description,
                        price,
                        type,
                        category,
                        createdAt,
                      }) => {
                        return (
                          <tr key={id}>
                            <td width="50%">{description}</td>
                            <td>
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
                            </td>
                            <td>{category}</td>
                            <td>
                              {dayjs(createdAt).format('DD/MM/YYYY HH:mm')}
                            </td>
                          </tr>
                        )
                      },
                    )
                  )}
                </tbody>
              </table>
            </section>
            <section className="w-full flex justify-end mt-[-50px]">
              <Pagination pageIndex={page} totalCount={transactions.length} />
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
