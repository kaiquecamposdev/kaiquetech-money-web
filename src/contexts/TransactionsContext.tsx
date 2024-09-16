import { ReactNode, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { createContext } from 'use-context-selector'

import { api } from '@/api'
import { z } from '@/lib/zod'

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

const uploadTransactionsSchema = z.object({
  file: z.instanceof(File),
})

const processTransactionsSchema = z.object({
  filepath: z.string(),
})

const unregisteredTransactionsSchema = z.object({
  client: z.string().optional(),
  description: z.string().max(255),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  price: z.coerce.number().default(0),
  discount: z.coerce.number().optional().default(0),
  tax: z.coerce.number().optional().default(0),
  paymentMethod: z.enum([
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
  ]),
  date: z.coerce.date(),
})

const saveTransactionsSchema = z.object({
  unregisteredTransactions: z.array(
    z.object({
      client: z.string().optional(),
      description: z.string().max(255),
      category: z.string().optional(),
      subCategory: z.string().optional(),
      price: z.coerce.number().default(0),
      discount: z.coerce.number().optional().default(0),
      tax: z.coerce.number().optional().default(0),
      paymentMethod: z.enum([
        'Dinheiro',
        'Cartão de Crédito',
        'Cartão de Débito',
        'Pix',
      ]),
      date: z.coerce.date(),
    }),
  ),
})

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

export type CreateTransaction = z.infer<typeof createTransactionSchema>

export type UploadTransactions = z.infer<typeof uploadTransactionsSchema>

export type ProcessTransactions = z.infer<typeof processTransactionsSchema>

export type SaveTransactions = z.infer<typeof saveTransactionsSchema>

export type UnregisteredTransactions = z.infer<
  typeof unregisteredTransactionsSchema
>

export type UpdateTransaction = z.infer<typeof updateTransactionSchema>

type GetTransactionsResponseType = {
  transactions: Transaction[]
}

type CreateTransactionResponseType = {
  transaction: Transaction
}

type UploadTransactionsResponseType = {
  message: string
  isSuccess: boolean
  filepath: string
}

type ProcessTransactionsResponseType = {
  message: string
  isSuccess: boolean
  unregisteredTransactions: UnregisteredTransactions[]
}

type SaveTransactionsResponseType = {
  message: string
  isSuccess: boolean
  transactions: Transaction[]
}

type UpdateTransactionResponseType = {
  transaction: Transaction
}

interface TransactionsContextProps {
  transactions: Transaction[]
  isLoading: boolean
  createTransaction: (data: CreateTransaction) => Promise<void>
  uploadTransactions: (
    data: UploadTransactions,
  ) => Promise<{ filepath: string }>
  processTransactions: (
    data: ProcessTransactions,
  ) => Promise<{ unregisteredTransactions: UnregisteredTransactions[] }>
  saveTransactions: (
    data: SaveTransactions,
  ) => Promise<{ transactions: Transaction[] }>
  removeTransaction: (id: string) => Promise<{ id: string }>
  updateTransaction: (data: UpdateTransaction) => Promise<void>
  removeSelectedTransactions: (transactionsId: string[]) => void
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

    if (data.length === 0) {
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
  const uploadTransactions = useCallback(async (data: UploadTransactions) => {
    const { file } = uploadTransactionsSchema.parse(data)

    const formData = new FormData()
    const blob = new Blob([file], { type: file.type })
    formData.append('file', blob, file.name)

    const { message, isSuccess, filepath } = (
      await api.post('upload', formData)
    ).data as UploadTransactionsResponseType

    if (!isSuccess) {
      throw toast.error(message)
    }

    toast.success(message)

    return {
      filepath,
    }
  }, [])
  const processTransactions = useCallback(
    async ({ filepath }: ProcessTransactions) => {
      const { message, isSuccess, unregisteredTransactions } = (
        await api.post('process', {
          filepath,
        })
      ).data as ProcessTransactionsResponseType

      if (!isSuccess) {
        throw toast.error(message)
      }

      toast.success(message)

      return {
        unregisteredTransactions,
      }
    },
    [],
  )
  const saveTransactions = useCallback(
    async ({ unregisteredTransactions }: SaveTransactions) => {
      const { message, isSuccess, transactions } = (
        await api.post('save', {
          unregisteredTransactions,
        })
      ).data as SaveTransactionsResponseType

      if (!isSuccess) {
        throw toast.error(message)
      }

      if (transactions) {
        const transactionsPromises = transactions.map((transaction) =>
          setTransactions((prevState) => [transaction, ...prevState]),
        )

        await Promise.all(transactionsPromises)

        toast.success(message)
      }

      return { transactions }
    },
    [],
  )
  const removeTransaction = useCallback(async (id: string) => {
    await api.delete(`transactions/${id}`)

    return { id }
  }, [])
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
  const removeSelectedTransactions = useCallback(
    async (transactionsId: string[]) => {
      const removeTransactionsPromise = transactionsId.forEach(
        async (transactionId) => {
          await removeTransaction(transactionId)
        },
      )

      await Promise.all([removeTransactionsPromise])

      const transactionsFiltered = transactions.filter(
        (transaction) => !transactionsId.includes(transaction.id),
      )

      setTransactions(transactionsFiltered)
    },
    [transactions, removeTransaction],
  )
  const fetchData = useCallback(async () => {
    setTimeout(async () => {
      const data = await getTransactions()

      if (data.length !== 0) setTransactions(data)
    }, 1000)
  }, [getTransactions])

  console.log(transactions)

  useEffect(() => {
    if (transactions.length === 0) {
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
        uploadTransactions,
        processTransactions,
        saveTransactions,
        removeTransaction,
        updateTransaction,
        removeSelectedTransactions,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
