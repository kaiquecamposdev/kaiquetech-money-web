import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useContextSelector } from 'use-context-selector'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Transaction,
  TransactionsContext,
} from '@/contexts/TransactionsContext'
import { dayjs } from '@/lib/dayjs'
import { cn } from '@/lib/utils'
import { z } from '@/lib/zod'
import { formatCurrency } from '@/utils/format-currency'

import { Calendar } from '../ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { ButtonRemoveTransactionModal } from './button-remove-transaction-modal'

type TransactionDetailsProps = {
  transaction: Transaction
}

const updateTransactionSchema = z.object({
  client: z.string().optional(),
  description: z.string().min(1).max(255),
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
  date: z.date().default(new Date()),
})

type UpdateTransactionForm = z.infer<typeof updateTransactionSchema>

export function ActionPaymentDetails({ transaction }: TransactionDetailsProps) {
  const [isEdit, setIsEdit] = useState(false)
  const form = useForm({
    resolver: zodResolver(updateTransactionSchema),
    defaultValues: {
      id: transaction.id,
      client: transaction.client || '',
      description: transaction.description,
      category: transaction.category || '',
      subCategory: transaction.subCategory || '',
      price: transaction.price,
      discount: transaction.discount || 0,
      tax: transaction.tax || 0,
      paymentMethod: transaction.paymentMethod,
      date: new Date(transaction.date),
    },
  })

  const { removeTransaction } = useContextSelector(
    TransactionsContext,
    ({ removeTransaction }) => {
      return {
        removeTransaction,
      }
    },
  )

  function onSetIsEdit() {
    event?.preventDefault()
    setIsEdit(!isEdit)
  }

  function onSubmit(data: UpdateTransactionForm) {
    console.log(data)
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

  const methods = updateTransactionSchema.shape.paymentMethod.options

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

      <DialogContent
        className="h-full max-h-[600px]"
        onEscapeKeyDown={onSetIsEdit}
        onInteractOutside={onSetIsEdit}
      >
        <DialogHeader>
          <DialogTitle>Transação: #{transaction.id}</DialogTitle>
          <DialogDescription>Detalhes da transação</DialogDescription>
        </DialogHeader>

        <ScrollArea>
          <div className="space-x-2">
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
                            {form.formState.errors.id ? (
                              <FormMessage>
                                {form.formState.errors.id.message}
                              </FormMessage>
                            ) : (
                              <FormDescription>
                                O ID é um valor único que identifica a
                                transação.
                              </FormDescription>
                            )}
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
                            {form.formState.errors.client ? (
                              <FormMessage>
                                {form.formState.errors.client.message}
                              </FormMessage>
                            ) : (
                              <FormDescription>
                                O cliente é a pessoa que está realizando a
                                transação.
                              </FormDescription>
                            )}
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
                              <Input {...field} />
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
                            {form.formState.errors.category ? (
                              <FormMessage>
                                {form.formState.errors.category.message}
                              </FormMessage>
                            ) : (
                              <FormDescription>
                                A categoria é um agrupamento de transações.
                              </FormDescription>
                            )}
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
                            {form.formState.errors.subCategory ? (
                              <FormMessage>
                                {form.formState.errors.subCategory.message}
                              </FormMessage>
                            ) : (
                              <FormDescription>
                                A sub-categoria é um agrupamento de transações
                                dentro de uma categoria.
                              </FormDescription>
                            )}
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
                              onBlur={() => {
                                if (field.value.toString() === '')
                                  form.setValue('price', 0)
                              }}
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
                            <Input
                              {...field}
                              onBlur={() => {
                                if (field.value.toString() === '')
                                  form.setValue('discount', 0)
                              }}
                            />
                          </FormControl>
                          {form.formState.errors.discount ? (
                            <FormMessage>
                              {form.formState.errors.discount.message}
                            </FormMessage>
                          ) : (
                            <FormDescription>
                              O desconto é um valor que será subtraído do total
                              da transação.
                            </FormDescription>
                          )}
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
                            <Input
                              {...field}
                              onBlur={() => {
                                if (field.value.toString() === '')
                                  form.setValue('tax', 0)
                              }}
                            />
                          </FormControl>
                          {form.formState.errors.tax ? (
                            <FormMessage>
                              {form.formState.errors.tax.message}
                            </FormMessage>
                          ) : (
                            <FormDescription>
                              A taxa é um valor que será subtraído do total da
                              transação.
                            </FormDescription>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={'paymentMethod'}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Método de Pagamento</FormLabel>
                          <FormControl>
                            <Select
                              {...field}
                              value={transaction.paymentMethod}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione o método de pagamento" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>
                                    Métodos de pagamento
                                  </SelectLabel>
                                  {methods.map((method) => {
                                    return (
                                      <SelectItem key={method} value={method}>
                                        {method}
                                      </SelectItem>
                                    )
                                  })}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          {form.formState.errors.paymentMethod ? (
                            <FormMessage>
                              {form.formState.errors.paymentMethod?.message}
                            </FormMessage>
                          ) : (
                            <FormDescription>
                              A taxa é um valor que será subtraído do total da
                              transação.
                            </FormDescription>
                          )}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={'date'}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Data</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className={cn(
                                    'w-[240px] pl-3 text-left font-normal',
                                    !field.value && 'text-muted-foreground',
                                  )}
                                >
                                  {field.value ? (
                                    dayjs(field.value).format('LL')
                                  ) : (
                                    <span>Escolha a data</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={() =>
                                  field.value > new Date() ||
                                  field.value < new Date('1900-01-01')
                                }
                              />
                            </PopoverContent>
                          </Popover>
                          {form.formState.errors.date ? (
                            <FormMessage>
                              {form.formState.errors.date.message}
                            </FormMessage>
                          ) : (
                            <FormDescription>
                              A data do momento em que a transação foi
                              realizada.
                            </FormDescription>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                        {dayjs(transaction.date).format('LL')}
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
          </div>
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
            <>
              <ButtonRemoveTransactionModal
                onRemoveTransaction={onRemoveTransaction}
                transaction={transaction}
              />
              <Button onClick={onSetIsEdit}>Editar</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </>
  )
}
