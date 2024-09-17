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
          acc.discount += transaction.discount || 0
          acc.tax += transaction.tax || 0
        } else {
          acc.lastExpensesDate = transaction.date
          acc.expenses += transaction.price
          acc.total += transaction.price
          acc.discount += transaction.discount || 0
          acc.tax += transaction.tax || 0
        }

        return acc
      },
      {
        grossRevenue: 0,
        expenses: 0,
        discount: 0,
        tax: 0,
        total: 0,
        lastGrossRevenueDate: new Date(),
        lastExpensesDate: new Date(),
      },
    )
  }, [transactions])

  return summary
}
