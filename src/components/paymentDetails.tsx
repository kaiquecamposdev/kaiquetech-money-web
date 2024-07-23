import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Transaction } from '@/contexts/TransactionsContext'
import { dayjs } from '@/lib/dayjs'
import { z } from '@/lib/zod'
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
  FormField,
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

const transactionSchema = z.object({
  client: z.string().optional(),
  description: z.string().min(1).max(255),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  price: z.coerce.number().min(1).default(0),
  discount: z.coerce.number().optional().default(0),
  tax: z.coerce.number().optional().default(0),
  // paymentMethod: z.enum([
  //   'Dinheiro',
  //   'Cartão de Crédito',
  //   'Cartão de Débito',
  //   'Pix',
  // ]),
  // date: z.date().default(new Date()),
})

type UpdateTransactionForm = z.infer<typeof transactionSchema>

export function PaymentDetails({ transaction }: TransactionDetailsProps) {
  const form = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      id: transaction.id,
      client: transaction.client || '',
      description: transaction.description,
      category: transaction.category || '',
      subCategory: transaction.subCategory || '',
      price: transaction.price,
      discount: transaction.discount || 0,
      tax: transaction.tax || 0,
      // paymentMethod: transaction.paymentMethod,
      // date: transaction.date,
    },
  })
  const [isEdit, setIsEdit] = useState(false)

  function onSetIsEdit() {
    setIsEdit(!isEdit)
  }

  function onSubmit(data: UpdateTransactionForm) {
    console.log(data)
  }

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
            <>
              <Form {...form}>
                <form
                  key={transaction.id}
                  id="transaction-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-3 px-2"
                >
                  <FormField
                    control={form.control}
                    name={'id'}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>ID</FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormDescription>
                            O ID é um valor único que identifica a transação.
                          </FormDescription>
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={'client'}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Cliente</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            O cliente é a pessoa que está realizando a
                            transação.
                          </FormDescription>
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={'description'}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              {...form.register('description', {
                                required: 'A descrição é um campo obrigatório.',
                              })}
                            />
                          </FormControl>
                          {form.formState.errors.description ? (
                            <FormMessage>
                              {form.formState.errors.description?.message}
                            </FormMessage>
                          ) : (
                            <FormDescription>
                              A descrição é um texto que descreve a transação.
                            </FormDescription>
                          )}
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={'category'}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            A categoria é um agrupamento de transações.
                          </FormDescription>
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={'subCategory'}
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Sub-categoria</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            A sub-categoria é um agrupamento de transações
                            dentro de uma categoria.
                          </FormDescription>
                        </FormItem>
                      </>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={'price'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            {...form.register('price', {
                              required: 'O preço é um campo obrigatório.',
                            })}
                          />
                        </FormControl>
                        {form.formState.errors.price ? (
                          <FormMessage>
                            {form.formState.errors.price.message}
                          </FormMessage>
                        ) : (
                          <FormDescription>
                            O preço é o valor da transação.
                          </FormDescription>
                        )}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={'discount'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desconto</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          O desconto é um valor que será subtraído do total da
                          transação.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={'tax'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Taxa</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          A taxa é um valor que será subtraído do total da
                          transação.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  {/* <FormField
                    control={form.control}
                    name={'paymentMethod'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Método de Pagamento</FormLabel>
                        <FormControl>{<Select {...field} />}</FormControl>
                        <FormMessage>
                          {form.formState.errors.tax?.message}
                        </FormMessage>
                        <FormDescription>
                          A taxa é um valor que será subtraído do total da
                          transação .
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={'date'}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data</FormLabel>
                        <FormControl>{<Input {...field} />}</FormControl>
                        <FormMessage />
                        <FormDescription>
                          A taxa é um valor que será subtraído do total da
                          transação .
                        </FormDescription>
                      </FormItem>
                    )}
                  /> */}
                </form>
              </Form>
            </>
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
              <Button form="transaction-form" type="submit">
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
