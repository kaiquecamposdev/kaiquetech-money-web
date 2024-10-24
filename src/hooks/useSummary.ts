import { useMemo } from 'react'
import { useContextSelector } from 'use-context-selector'

import { TransactionsContext } from '@/providers/transactions-provider'

export function useSummary() {
  const { summary } = useContextSelector(TransactionsContext, ({ summary }) => {
    return summary
  })

  const summaryToTransactionType = useMemo(() => {
    return (
      summary.summaryToTransactionType?.reduce(
        (acc, details) => {
          if (details.type === 'INCOME') {
            acc.incomes = details.amount
            acc.countIncomes = details.count
            acc.lastIncomesDate = details.last_date
          } else {
            acc.expenses = details.amount
            acc.countExpenses = details.count
            acc.lastExpensesDate = details.last_date
          }

          return acc
        },
        {
          countIncomes: 0,
          countExpenses: 0,
          incomes: 0,
          expenses: 0,
          lastIncomesDate: new Date(),
          lastExpensesDate: new Date(),
        },
      ) || []
    )
  }, [summary])

  const summaryToPaymentMethod = useMemo(() => {
    return (
      summary.summaryToPaymentMethod?.reduce(
        (acc, details) => {
          acc[details.payment_method].count = details.count
          acc[details.payment_method].amount =
            details.incomes - details.discounts - details.taxes

          return acc
        },
        {
          MONEY: {
            count: 0,
            amount: 0,
          },
          CREDIT: {
            count: 0,
            amount: 0,
          },
          DEBIT: {
            count: 0,
            amount: 0,
          },
          PIX: {
            count: 0,
            amount: 0,
          },
          PAYMENTLINK: {
            count: 0,
            amount: 0,
          },
          TED: {
            count: 0,
            amount: 0,
          },
        },
      ) || []
    )
  }, [summary])

  const summaryToMonth = useMemo(() => {
    return (
      summary.summaryToMonth?.reduce(
        (acc, details) => {
          acc.year_month.amount = details.amount
          acc.year_month.count = details.count
          acc.year_month.incomes = details.incomes
          acc.year_month.expenses = details.expenses

          return acc
        },
        {
          year_month: {
            amount: 0,
            count: 0,
            incomes: 0,
            expenses: 0,
          },
        },
      ) || []
    )
  }, [summary])

  return {
    summaryToTransactionType,
    summaryToPaymentMethod,
    summaryToMonth,
  }
}
