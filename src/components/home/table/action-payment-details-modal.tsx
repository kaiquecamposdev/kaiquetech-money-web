import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useContextSelector } from 'use-context-selector'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Transaction,
  TransactionsContext,
} from '@/contexts/TransactionsContext'
import { z } from '@/lib/zod'

import { UpdateTransactionsForm } from '../form/update-transactions-form'
import { PaymentDetails } from './payment-details'
import { RemoveTransactionModal } from './remove-transaction-modal'

type ActionPaymentDetailsModalProps = {
  transaction: Transaction
}

const updateTransactionSchema = z.object({
  id: z.string(),
  client: z.string().optional(),
  description: z.string(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  price: z.coerce.number(),
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

export const ActionPaymentDetailsModal = ({
  transaction,
}: ActionPaymentDetailsModalProps) => {
  const [isEdit, setIsEdit] = useState(false)
  const form = useForm({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      id: transaction.id,
      client: transaction.client || '',
      description: transaction.description,
      category: transaction.category || '',
      subCategory: transaction.subCategory || '',
      price: transaction.price || 0,
      discount: transaction.discount || 0,
      tax: transaction.tax || 0,
      paymentMethod: transaction.paymentMethod,
      date: transaction.date,
    },
  })

  const { removeTransaction, updateTransaction } = useContextSelector(
    TransactionsContext,
    ({ removeTransaction, updateTransaction }) => {
      return {
        removeTransaction,
        updateTransaction,
      }
    },
  )

  function onSetIsEdit(value: boolean) {
    event?.preventDefault()
    setIsEdit(value)
    form.reset()
  }

  function onSubmit(data: UpdateTransaction) {
    updateTransaction(data)
      .then(() => {
        toast.success('Transação atualizada com sucesso.')

        onSetIsEdit(false)
        form.reset()
      })
      .catch(() => {
        throw toast.warning('Erro ao atualizar a transação.')
      })
  }

  function onRemoveTransaction(id: string) {
    removeTransaction(id)
      .then(() => {
        toast.success('Transação removida com sucesso.')
      })
      .catch(() => {
        toast.warning('Erro ao remover a transação.')
      })
  }

  return (
    <DialogContent className="h-full max-h-[600px] w-full max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Transação: #{transaction.id}</DialogTitle>
        <DialogDescription>Detalhes da transação</DialogDescription>
      </DialogHeader>

      <ScrollArea>
        <div className="px-4">
          {isEdit ? (
            <UpdateTransactionsForm form={form} onSubmit={onSubmit} />
          ) : (
            <PaymentDetails transaction={transaction} />
          )}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      <DialogFooter>
        {isEdit ? (
          <>
            <Button variant="ghost" onClick={() => onSetIsEdit(false)}>
              Voltar
            </Button>

            <Button form="transaction-form" type="submit">
              Salvar
            </Button>
          </>
        ) : (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Excluir</Button>
              </DialogTrigger>
              <RemoveTransactionModal
                transaction={transaction}
                onRemoveTransaction={onRemoveTransaction}
              />
            </Dialog>

            <Button onClick={() => onSetIsEdit(true)}>Editar</Button>
          </>
        )}
      </DialogFooter>
    </DialogContent>
  )
}
