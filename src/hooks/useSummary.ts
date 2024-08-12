import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'

import { TransactionsContext } from '@/contexts/TransactionsContext'

export function useSummary() {
  const transactions = useContextSelector(
    TransactionsContext,
    ({ transactions }) => {
      return transactions
    },
  )

  const summary = useMemo(() => {
    return transactions.reduce(
      (acc, transaction) => {
        if (!String(transaction.price).includes('-')) {
          acc.lastGrossRevenueDate = transaction.date
          acc.grossRevenue += transaction.price
          acc.total += transaction.price
        } else {
          acc.lastExpensesDate = transaction.date
          acc.expenses += transaction.price
          acc.total += transaction.price
        }

        return acc
      },
      {
        grossRevenue: 0,
        expenses: 0,
        total: 0,
        lastGrossRevenueDate: new Date(),
        lastExpensesDate: new Date(),
      },
    )
  }, [transactions])

  return summary
}
