import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'

import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { z } from '@/lib/zod'
import { TransactionsContext } from '@/providers/transactions-provider'

import { UploadTransactionsForm } from '../forms/upload-transactions-form'

const uploadTransactionsFormSchema = z.object({
  file: z.instanceof(File).refine((file) => file !== null, {
    message: 'Por favor, selecione um arquivo.',
  }),
})

export type UploadTransactionsFormType = {
  file: File
}

type UploadTransactionsModalProps = {
  setOpenUploadTransactionsModal: (openUploadTransactionsModal: boolean) => void
}

export function UploadTransactionsModal({
  setOpenUploadTransactionsModal,
}: UploadTransactionsModalProps) {
  const { uploadTransactions, processTransactions, saveTransactions } =
    useContextSelector(
      TransactionsContext,
      ({ uploadTransactions, processTransactions, saveTransactions }) => {
        return {
          uploadTransactions,
          processTransactions,
          saveTransactions,
        }
      },
    )

  const form = useForm<UploadTransactionsFormType>({
    resolver: zodResolver(uploadTransactionsFormSchema),
  })

  async function onSubmit({ file }: UploadTransactionsFormType) {
    try {
      const { filepath } = await uploadTransactions({ file })

      const { unregisteredTransactions } = await processTransactions({
        filepath,
      })

      const { transactions } = await saveTransactions({
        unregisteredTransactions,
      })

      if (transactions) {
        setOpenUploadTransactionsModal(false)
        form.reset()
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <DialogContent className="h-full max-h-[550px] w-full max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Registrar Transações</DialogTitle>
          <DialogDescription>Registre transações com .csv</DialogDescription>
        </DialogHeader>

        <UploadTransactionsForm form={form} onSubmit={onSubmit} />

        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>

          <Button form="upload-transactions-form" type="submit">
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  )
}
