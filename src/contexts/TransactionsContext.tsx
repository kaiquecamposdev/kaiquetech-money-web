import { ReactNode, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
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
  date: z.coerce.date(),
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
  date: z.coerce.date(),
})

export type UpdateTransaction = z.infer<typeof updateTransactionSchema>

// type GetTransactionResponseType = {
//   transaction: Transaction
// }

type GetTransactionsResponseType = {
  transactions: Transaction[]
}

type CreateTransactionResponseType = {
  transaction: Transaction
}

type UpdateTransactionResponseType = {
  transaction: Transaction
}

// type RemoveTransactionResponseType = {
//   transactionDeleted: Transaction
// }

interface TransactionsContextProps {
  transactions: Transaction[]
  isLoading: boolean
  createTransaction: (data: CreateTransaction) => Promise<void>
  updateTransaction: (data: UpdateTransaction) => Promise<void>
  removeTransaction: (id: string) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextProps)

export function TransactionsProvider({ children }: TransactionsContextType) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const transactionsStoredAsJSON = localStorage.getItem(
      '@kaiquetech:transactions-state-1.0.0',
    )

    if (transactionsStoredAsJSON) {
      const { transactions } = JSON.parse(transactionsStoredAsJSON)

      return transactions
    }

    return []
  })
  const [isLoading, setIsLoading] = useState(true)

  const getTransactions = useCallback(async () => {
    if (transactions && transactions.length > 0) {
      return transactions
    }

    const { transactions: data } = (await api.get('transactions'))
      .data as GetTransactionsResponseType

    if (!data || data.length === 0) {
      return []
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
      localStorage.setItem(
        'transactions',
        JSON.stringify([transaction, ...transactions]),
      )
    },
    [transactions],
  )
  const removeTransaction = useCallback(
    async (id: string) => {
      await api.delete(`transactions/${id}`)

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
  const fetchData = useCallback(async () => {
    const data = await getTransactions()
    setTransactions(data)
  }, [getTransactions])

  useEffect(() => {
    if (!transactions || transactions.length === 0) {
      fetchData()
        .then(() => {
          setIsLoading(false)
          toast.success('Transações carregadas com sucesso.')
        })
        .catch(() => {
          setIsLoading(true)
          toast.error('Erro ao carregar as transações.')
        })
    }
  }, [transactions, fetchData])

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
