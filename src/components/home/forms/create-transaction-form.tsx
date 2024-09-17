/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarIcon } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TimePickerDemo } from '@/components/ui/time-picker-demo'
import { dayjs } from '@/lib/dayjs'
import { cn } from '@/lib/utils'

import { CreateTransactionFormType } from '../modals/create-transaction-modal'

type CreateTransactionFormProps = {
  form: UseFormReturn<
    {
      description: string
      price: number
      paymentMethod:
        | 'Dinheiro'
        | 'Cartão de Crédito'
        | 'Cartão de Débito'
        | 'Pix'
        | 'Link de Pagamento'
        | 'TED'
      date: Date
      client?: string | undefined
      category?: string | undefined
      subCategory?: string | undefined
      discount?: number | undefined
      tax?: number | undefined
    },
    any,
    undefined
  >
  onSubmit: (values: CreateTransactionFormType) => void
}

export function CreateTransactionForm({
  form,
  onSubmit,
}: CreateTransactionFormProps) {
  const methods = [
    'Dinheiro',
    'Cartão de Crédito',
    'Cartão de Débito',
    'Pix',
    'Link de Pagamento',
    'TED',
  ]

  return (
    <Form {...form}>
      <form
        id="create-transaction-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
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
                    O cliente é a pessoa que está realizando a transação.
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
                <FormLabel>Subcategoria</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {form.formState.errors.subCategory ? (
                  <FormMessage>
                    {form.formState.errors.subCategory.message}
                  </FormMessage>
                ) : (
                  <FormDescription>
                    A subcategoria é um agrupamento de transações dentro de uma
                    categoria.
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
                  type="number"
                  onBlur={() => {
                    if (field.value.toString() === '') form.setValue('price', 0)
                  }}
                  required
                />
              </FormControl>
              {form.formState.errors.price ? (
                <FormMessage>{form.formState.errors.price.message}</FormMessage>
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
                  type="number"
                  onBlur={() => {
                    if (field.value?.toString() === '')
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
                  O desconto é um valor que será subtraído do total da
                  transação.
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
                  type="number"
                  onBlur={() => {
                    if (field.value?.toString() === '') form.setValue('tax', 0)
                  }}
                />
              </FormControl>
              {form.formState.errors.tax ? (
                <FormMessage>{form.formState.errors.tax.message}</FormMessage>
              ) : (
                <FormDescription>
                  A taxa é um valor que será subtraído do total da transação.
                </FormDescription>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={'paymentMethod'}
          render={({ field }) => (
            <FormItem {...field}>
              <FormLabel>Método de Pagamento</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o método de pagamento" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Métodos de pagamento</SelectLabel>
                    {methods.map((method) => {
                      return (
                        <SelectItem key={method} id={method} value={method}>
                          {method}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {form.formState.errors.paymentMethod ? (
                <FormMessage>
                  {form.formState.errors.paymentMethod?.message}
                </FormMessage>
              ) : (
                <FormDescription>
                  A taxa é um valor que será subtraído do total da transação.
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
              <FormLabel className="text-left">Data da Transação</FormLabel>
              <Popover>
                <FormControl>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        dayjs(field.value).format('lll')
                      ) : (
                        <span>Escolha a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                </FormControl>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <div className="border-t border-border p-3">
                    <TimePickerDemo
                      date={new Date(field.value)}
                      setDate={field.onChange}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              {form.formState.errors.date ? (
                <FormMessage>{form.formState.errors.date.message}</FormMessage>
              ) : (
                <FormDescription>
                  A data do momento em que a transação foi realizada.
                </FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
