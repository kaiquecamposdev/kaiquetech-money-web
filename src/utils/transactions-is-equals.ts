import { Transaction } from '@/contexts/TransactionsContext'

type TransactionsKeys = keyof Transaction

/* eslint-disable @typescript-eslint/no-explicit-any */
export function transactionsIsEqual(
  oldTransaction: Transaction,
  newTransaction: Transaction,
): { [key in TransactionsKeys]: boolean } {
  const keys = Object.keys(oldTransaction) as TransactionsKeys[]
  const values: { [key in TransactionsKeys]: boolean } = {
    id: false,
    client_name: false,
    description: false,
    category: false,
    sub_category: false,
    price: false,
    discount: false,
    tax: false,
    payment_method: false,
    date: false,
  }

  for (const key of keys) {
    values[key] = oldTransaction[key] === newTransaction[key]
  }

  return values
}
