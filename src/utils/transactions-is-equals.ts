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
    client: false,
    description: false,
    category: false,
    subCategory: false,
    price: false,
    discount: false,
    tax: false,
    paymentMethod: false,
    date: false,
  }

  for (const key of keys) {
    values[key] = oldTransaction[key] === newTransaction[key]
  }

  return values
}
