import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { z } from 'zod'

import { api } from '@/api'

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
  discount: z.coerce.number().optional(),
  tax: z.coerce.number().optional(),
  paymentMethod: z.enum([
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
  ]),
  date: z.date(),
})

export type CreateTransaction = z.infer<typeof createTransactionSchema>

const updateTransactionSchema = z.object({
  id: z.string(),
  client: z.string().optional(),
  description: z.string(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  price: z.number(),
  discount: z.coerce.number().optional(),
  tax: z.coerce.number().optional(),
  paymentMethod: z.enum([
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
  ]),
  date: z.date(),
})

export type UpdateTransaction = z.infer<typeof updateTransactionSchema>

type GetTransactionsResponseType = {
  transactions: Transaction[]
}

type CreateTransactionResponseType = {
  transaction: Transaction
}

type UpdateTransactionResponseType = {
  transaction: Transaction
}

type RemoveTransactionResponseType = {
  transaction: Transaction
}

interface TransactionsContextProps {
  transactions: Transaction[]
  isLoading: boolean
  createTransaction: (data: CreateTransaction) => Promise<void>
  updateTransaction: (data: UpdateTransaction) => Promise<void>
  removeTransaction: (id: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextProps)

export function TransactionsProvider({ children }: TransactionsContextType) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const getTransactions = useCallback(async () => {
    if (transactions.length > 0) {
      return transactions
    }

    const { transactions: data } = (await (
      await api.get('transactions')
    ).data) as GetTransactionsResponseType

    if (!data) {
      throw new Error('Transactions not found')
    }

    return data
  }, [transactions])

  const createTransaction = useCallback(
    async (data: CreateTransaction) => {
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
      } = createTransactionSchema.parse(data)

      const { transaction } = (
        await api.post('transactions', {
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
          updatedAt: null,
        })
      ).data as CreateTransactionResponseType

      if (!transaction) {
        throw new Error('Transaction not created')
      }

      setTransactions([transaction, ...transactions])
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

      const { transaction: data } = (await api.delete(`transactions/${id}`))
        .data as RemoveTransactionResponseType

      if (!data) {
        throw new Error('Transaction not removed')
      }

      setTransactions(
        transactions.filter((transaction) => transaction.id !== id),
      )
    },
    [transactions],
  )
  const updateTransaction = useCallback(
    async (data: UpdateTransaction) => {
      const {
        id,
        client,
        description,
        category,
        subCategory,
        price,
        discount,
        tax,
        paymentMethod,
        date,
      } = updateTransactionSchema.parse(data)

      const { transaction } = (
        await api.put(`transactions/${id}`, {
          client,
          description,
          category,
          subCategory,
          price,
          discount,
          tax,
          paymentMethod,
          date,
        })
      ).data as UpdateTransactionResponseType

      if (!transaction) {
        throw new Error('Transaction not updated')
      }

      setTransactions(
        transactions.filter((item) => item.id === id && transaction),
      )
    },
    [transactions],
  )

  useEffect(() => {
    if (transactions.length === 0) {
      getTransactions().then((data) => {
        setTransactions(data)
        setIsLoading(false)
      })
    }
  }, [transactions, setTransactions, getTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        isLoading,
        createTransaction,
        removeTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
