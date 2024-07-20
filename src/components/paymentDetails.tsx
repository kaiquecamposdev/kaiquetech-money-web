import { useForm } from '@tanstack/react-form'
import { zodValidator } from '@tanstack/zod-form-adapter'
import { useState } from 'react'
import { z, ZodError } from 'zod'

import { Transaction } from '@/contexts/TransactionsContext'
import { dayjs } from '@/lib/dayjs'
import { formatCurrency } from '@/utils/format-currency'

import { Button } from './ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
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

  const form = useForm({
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: z.object({
        id: z.number(),
        client: z.string(),
        description: z.string(),
        category: z.string(),
        subCategory: z.string(),
        price: z.number(),
        discount: z.number().optional(),
        tax: z.number().optional(),
        date: z.string(),
      }),
    },
    defaultValues: {
      id: transaction.id,
      client: transaction.client,
      description: transaction.description,
      category: transaction.category,
      subCategory: transaction.subCategory,
      price: transaction.price,
      discount: transaction.discount,
      tax: transaction.tax,
      date: transaction.date,
    },
    onSubmit: async ({ value }) => {
      if (value) {
        console.log(value)
        onSetIsEdit()
      }

      throw new ZodError([])
    },
  })

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

      <DialogContent className="h-full max-h-[600px]">
        <DialogHeader>
          <DialogTitle>Transação: #{transaction.id}</DialogTitle>
          <DialogDescription>Detalhes da transação</DialogDescription>
        </DialogHeader>

        <ScrollArea>
          {isEdit ? (
            <Form
              children={
                <>
                  <form.Field name={'id'}>
                    {(field) => (
                      <>
                        <FormItem>
                          <FormLabel>ID</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id={field.name}
                              name={field.name}
                              value={field.state.value || 0}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            O ID é um valor único que identifica a transação.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  </form.Field>
                  <form.Field name={'client'}>
                    {(field) => (
                      <>
                        <FormItem>
                          <FormLabel>Cliente</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id={field.name}
                              name={field.name}
                              value={field.state.value || 0}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            O cliente é a pessoa que está realizando a
                            transação.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  </form.Field>
                  <form.Field name={'description'}>
                    {(field) => (
                      <>
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id={field.name}
                              name={field.name}
                              value={field.state.value || 0}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            A descrição é um texto que descreve a transação.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  </form.Field>
                  <form.Field name={'category'}>
                    {(field) => (
                      <>
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id={field.name}
                              name={field.name}
                              value={field.state.value || 0}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            A categoria é um agrupamento de transações.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  </form.Field>
                  <form.Field name={'subCategory'}>
                    {(field) => (
                      <>
                        <FormItem>
                          <FormLabel>Sub-categoria</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id={field.name}
                              name={field.name}
                              value={field.state.value || 0}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            A sub-categoria é um agrupamento de transações
                            dentro de uma categoria.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  </form.Field>
                  <form.Field name={'price'}>
                    {(field) => (
                      <>
                        <FormItem>
                          <FormLabel>Preço</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id={field.name}
                              name={field.name}
                              value={field.state.value || 0}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            O preço é o valor da transação.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  </form.Field>
                  <form.Field name={'discount'}>
                    {(field) => (
                      <>
                        <FormItem>
                          <FormLabel>Desconto</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id={field.name}
                              name={field.name}
                              value={field.state.value || 0}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            O desconto é um valor que será subtraído do total da
                            transação.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  </form.Field>
                  <form.Field name={'tax'}>
                    {(field) => (
                      <>
                        <FormItem>
                          <FormLabel>Taxa</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              id={field.name}
                              name={field.name}
                              value={field.state.value || 0}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            A taxa é um valor que será adicionado ao total da
                            transação.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  </form.Field>
                </>
              }
            ></Form>
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
          <ScrollBar orientation="vertical" />
        </ScrollArea>

        <DialogFooter>
          {isEdit ? (
            <>
              <Button variant="ghost" onClick={onSetIsEdit}>
                Voltar
              </Button>
              <Button type="submit" onClick={form.handleSubmit}>
                Salvar
              </Button>
            </>
          ) : (
            <Button onClick={onSetIsEdit}>Editar</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </>
  )
}
