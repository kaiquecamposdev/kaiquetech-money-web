import { useForm } from '@tanstack/react-form'
import { useState } from 'react'

import { Transaction } from '@/contexts/TransactionsContext'
import { dayjs } from '@/lib/dayjs'
import { formatCurrency } from '@/utils/format-currency'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'

type TransactionDetailsProps = {
  transaction: Transaction
}

export function PaymentDetails({ transaction }: TransactionDetailsProps) {
  const [isEdit, setIsEdit] = useState(false)

  function onSetIsEdit() {
    setIsEdit(!isEdit)
  }

  const { handleSubmit, validate } = useForm({
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  console.log(validate)

  return (
    <>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-full cursor-default px-2 py-1.5 font-normal"
        >
          Visualizar detalhes do pagamento
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transação: #{transaction.id}</DialogTitle>
          <DialogDescription>Detalhes da transação</DialogDescription>
        </DialogHeader>

        {isEdit ? (
          <form onSubmit={handleSubmit}>
            <textarea
              id="edit-transaction"
              name="edit-transaction"
              className="h-80 w-full resize-none rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
            >
              {JSON.stringify(transaction, null, 2)}
            </textarea>
          </form>
        ) : (
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>ID:</TableCell>
                  <TableCell>{transaction.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Cliente:</TableCell>
                  <TableCell>{transaction.client}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Descrição:</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Categoria:</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sub-categoria:</TableCell>
                  <TableCell>{transaction.subCategory}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Valor:</TableCell>
                  <TableCell>{formatCurrency(transaction.price)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Data:</TableCell>
                  <TableCell>
                    {dayjs(transaction.date).format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Desconto</TableHead>
                  <TableHead>Taxa</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(transaction.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency((transaction.discount ?? 0) * -1)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency((transaction.tax ?? 0) * -1)}
                  </TableCell>
                </TableRow>
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total da transação</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(
                      transaction.price -
                        (transaction.discount || 0) -
                        (transaction.tax || 0),
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Fechar</Button>
          </DialogClose>
          {isEdit ? (
            <Button onSubmit={handleSubmit} onClick={onSetIsEdit}>
              Salvar
            </Button>
          ) : (
            <Button onClick={onSetIsEdit}>Editar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </>
  )
}
