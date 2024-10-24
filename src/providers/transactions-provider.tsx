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
  client_name?: string
  description: string
  category?: string
  sub_category?: string
  type: 'ENTRADA' | 'SAIDA'
  price: number
  discount?: number
  tax?: number
  payment_method:
    | 'Dinheiro'
    | 'Cartão de Crédito'
    | 'Cartão de Débito'
    | 'Pix'
    | 'Link de Pagamento'
    | 'TED'
  date: Date
}

export type Summary = {
  summary: {
    summaryToTransactionType: {
      count: number
      type: 'INCOME' | 'EXPENSE'
      discounts: number
      taxes: number
      amount: number
      last_date: Date
    }[]
    summaryToPaymentMethod: {
      count: number
      payment_method:
        | 'CREDIT'
        | 'DEBIT'
        | 'MONEY'
        | 'PIX'
        | 'PAYMENTLINK'
        | 'TED'
      discounts: number
      taxes: number
      incomes: number
    }[]
    summaryToMonth: {
      year_month: string
      count: number
      discounts: number
      taxes: number
      incomes: number
      expenses: number
      amount: number
    }[]
  }
}

const createTransactionSchema = z.object({
  client_name: z.string().optional(),
  description: z.string(),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  type: z.enum(['ENTRADA', 'SAIDA']),
  price: z.number(),
  discount: z.coerce.number().optional(),
  tax: z.coerce.number().optional(),
  payment_method: z.enum([
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
    'Link de Pagamento',
    'TED',
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
  client_name: z.string().optional(),
  description: z.string().max(255),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  type: z.enum(['INCOME', 'EXPENSE']),
  price: z.coerce.number().default(0),
  discount: z.coerce.number().optional().default(0),
  tax: z.coerce.number().optional().default(0),
  payment_method: z.enum([
    'CREDIT',
    'DEBIT',
    'MONEY',
    'PIX',
    'PAYMENTLINK',
    'TED',
  ]),
  date: z.coerce.date(),
})

const saveTransactionsSchema = z.object({
  unregisteredTransactions: z.array(
    z.object({
      client_name: z.string().optional(),
      description: z.string().max(255),
      category: z.string().optional(),
      sub_category: z.string().optional(),
      type: z.enum(['INCOME', 'EXPENSE']),
      price: z.coerce.number().default(0),
      discount: z.coerce.number().optional().default(0),
      tax: z.coerce.number().optional().default(0),
      payment_method: z.enum([
        'CREDIT',
        'DEBIT',
        'MONEY',
        'PIX',
        'PAYMENTLINK',
        'TED',
      ]),
      date: z.coerce.date(),
    }),
  ),
})

const updateTransactionSchema = z.object({
  id: z.string(),
  client_name: z.string().optional(),
  description: z.string(),
  category: z.string().optional(),
  sub_category: z.string().optional(),
  type: z.enum(['ENTRADA', 'SAIDA']),
  price: z.number(),
  discount: z.coerce.number().optional(),
  tax: z.coerce.number().optional(),
  payment_method: z.enum([
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
    'Link de Pagamento',
    'TED',
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
  maxSize: number
  transactions: Transaction[]
}

type GetSummaryResponseType = {
  summary: {
    summaryToTransactionType: {
      count: number
      type: 'INCOME' | 'EXPENSE'
      discounts: number
      taxes: number
      amount: number
      last_date: Date
    }[]
    summaryToPaymentMethod: {
      count: number
      payment_method:
        | 'CREDIT'
        | 'DEBIT'
        | 'MONEY'
        | 'PIX'
        | 'PAYMENTLINK'
        | 'TED'
      discounts: number
      taxes: number
      incomes: number
    }[]
    summaryToMonth: {
      year_month: string
      count: number
      discounts: number
      taxes: number
      incomes: number
      expenses: number
      amount: number
    }[]
  }
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
  maxSizeTransactions: number
  transactions: Transaction[]
  summary: Summary
  isLoading: boolean
  page: number
  onSetPage: (page: number) => void
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
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [summary, setSummary] = useState<Summary>({
    summary: {
      summaryToTransactionType: [],
      summaryToPaymentMethod: [],
      summaryToMonth: [],
    },
  } as Summary)
  const [isLoading, setIsLoading] = useState(true)
  const [maxSizeTransactions, setMaxSizeTransactions] = useState(0)
  const [page, setPage] = useState(1)

  const getTransactions = useCallback(async () => {
    if (transactions && transactions.length > 0) {
      return transactions
    }

    const { maxSize, transactions: data } = (
      await api.get('transactions', {
        params: {
          page,
        },
      })
    ).data as GetTransactionsResponseType

    if (data.length === 0) {
      return []
    }

    return {
      maxSize,
      transactions: data,
    }
  }, [transactions, page])
  const getSummary = useCallback(async () => {
    const summary = (await api.get('/transactions/summary'))
      .data as GetSummaryResponseType

    return summary
  }, [])
  const createTransaction = useCallback(
    async (data: CreateTransaction) => {
      const {
        client_name,
        description,
        category,
        sub_category,
        price,
        discount,
        tax,
        payment_method,
        date,
      } = createTransactionSchema.parse(data)

      const { transaction } = (
        await api.post('transactions', {
          client_name,
          description,
          category,
          sub_category,
          price,
          discount,
          tax,
          payment_method,
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
        client_name,
        description,
        category,
        sub_category,
        price,
        discount,
        tax,
        payment_method,
        date,
      } = updateTransactionSchema.parse(data)

      const { transaction } = (
        await api.put(`transactions/${id}`, {
          client_name,
          description,
          category,
          sub_category,
          price,
          discount,
          tax,
          payment_method,
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
      const { maxSize, transactions } =
        (await getTransactions()) as GetTransactionsResponseType

      if (transactions.length !== 0) {
        setMaxSizeTransactions(maxSize)
        setTransactions(transactions)
      }
    }, 2000)
  }, [getTransactions])
  function onSetPage(page: number) {
    setPage(page)
  }

  useEffect(() => {
    if (transactions.length === 0 || page) {
      fetchData()
        .then(() => {
          setIsLoading(false)
          toast.success('Transações carregadas com sucesso.')
        })
        .catch(() => {
          setIsLoading(true)
          toast.error('Erro ao carregar as transações.')
        })

      getSummary()
        .then((data) => {
          setSummary(data)
          toast.success('Resumo carregado com sucesso.')
        })
        .catch(() => {
          toast.error('Erro ao carregar o resumo.')
        })
    }
  }, [page, transactions, fetchData, getSummary])

  return (
    <TransactionsContext.Provider
      value={{
        summary,
        transactions,
        isLoading,
        createTransaction,
        uploadTransactions,
        processTransactions,
        saveTransactions,
        removeTransaction,
        updateTransaction,
        removeSelectedTransactions,
        maxSizeTransactions,
        page,
        onSetPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
