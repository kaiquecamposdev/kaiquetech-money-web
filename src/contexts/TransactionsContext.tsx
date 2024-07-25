import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { z } from 'zod'

import { api } from '@/lib/axios'

interface TransactionsContextType {
  children: ReactNode
}

export type Transaction = {
  id: string
  client?: string
  description: string
  category?: string
  subCategory?: string
  price: number
  discount?: number
  tax?: number
  paymentMethod: 'Dinheiro' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Pix'
  date: Date
}

const createTransactionSchema = z.object({
  client: z.string().optional(),
  description: z.string(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  price: z.number(),
  discount: z.number().optional(),
  tax: z.number().optional(),
  paymentMethod: z.enum([
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
  ]),
  date: z.date(),
})

type CreateTransaction = z.infer<typeof createTransactionSchema>

interface TransactionsContextProps {
  transactions: Transaction[]
  isLoading: boolean
  fetchTransactions: () => Promise<Transaction[]>
  createNewTransaction: (data: CreateTransaction) => Promise<void>
  removeTransaction: (id: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextProps)

export function TransactionsProvider({ children }: TransactionsContextType) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTransactions = useCallback(async () => {
    const response = await api.get('transactions')
    const data = response.data as Transaction[]

    return data
  }, [])

  const setTransactionsState = useCallback(async () => {
    fetchTransactions()
      .then((data) => {
        setTransactions(data)
      })
      .catch(() => {
        setTransactions([])
      })
  }, [fetchTransactions])

  const createNewTransaction = useCallback(
    async (transaction: CreateTransaction) => {
      const {
        client,
        description,
        category,
        subCategory,
        price,
        discount,
        tax,
        paymentMethod,
        date,
      } = createTransactionSchema.parse(transaction)

      const { data } = await api.post('transactions', {
        client,
        description,
        category,
        subCategory,
        price,
        discount,
        tax,
        paymentMethod,
        date,
        createdAt: new Date(),
      })

      setTransactions([data, ...transactions])
    },
    [transactions],
  )
  const removeTransaction = useCallback(
    async (id: string) => {
      const transaction = await api.get('transactions', {
        params: {
          id,
        },
      })

      if (!transaction) {
        throw new Error('Transaction not found')
      }

      setTransactions(
        transactions.filter((transaction) => transaction.id !== id),
      )
      await api.delete(`transactions/${id}`)
    },
    [transactions],
  )

  useEffect(() => {
    if (transactions.length === 0) {
      setTransactionsState().then(() => {
        setIsLoading(false)
      })
    }
  }, [setTransactionsState, transactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isLoading,
        fetchTransactions,
        createNewTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
