/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { TransactionsContext } from '@/contexts/TransactionsContext'

import { CreateTransactionForm } from '../forms/create-transaction-form'

const createTransactionFormSchema = z.object({
  client: z.string().optional(),
  description: z.string().min(1),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  price: z.coerce.number().min(1),
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

export type CreateTransactionFormType = z.infer<
  typeof createTransactionFormSchema
>

type CreateTransactionModalProps = {
  setOpenCreateTransactionModal: (openCreateTransactionModal: boolean) => void
}

export function CreateTransactionModal({
  setOpenCreateTransactionModal,
}: CreateTransactionModalProps) {
  const form = useForm<CreateTransactionFormType>({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      client: '',
      description: '',
      category: '',
      subCategory: '',
      price: 0,
      discount: 0,
      tax: 0,
      paymentMethod: 'Pix',
      date: new Date(),
    },
  })

  const createTransaction = useContextSelector(
    TransactionsContext,
    ({ createTransaction }) => {
      return createTransaction
    },
  )

  async function onSubmit(data: CreateTransactionFormType) {
    createTransaction(data)
      .then(() => {
        setOpenCreateTransactionModal(false)
        form.reset()
        toast.success('Transação cadastrada com sucesso.')
      })
      .catch(() => {
        toast.error('Erro ao cadastrar a transação.')
      })
  }

  return (
    <>
      <DialogContent className="h-full max-h-[600px] w-full max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar transação</DialogTitle>
          <DialogDescription>Registre os dados da venda.</DialogDescription>
        </DialogHeader>

        <ScrollArea>
          <div className="px-4">
            <CreateTransactionForm form={form} onSubmit={onSubmit} />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>

        <DialogFooter>
          <Button variant="ghost">Cancelar</Button>

          <Button
            form="create-transaction-form"
            type="submit"
            variant="default"
          >
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
