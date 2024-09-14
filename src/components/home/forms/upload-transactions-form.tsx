/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from 'react-hook-form'

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

import { UploadTransactionsFormType } from '../modals/upload-transactions-modal'

type UploadTransactionsFormProps = {
  form: UseFormReturn<
    {
      file: File
    },
    any,
    undefined
  >
  onSubmit: (values: UploadTransactionsFormType) => void
}

export function UploadTransactionsForm({
  form,
  onSubmit,
}: UploadTransactionsFormProps) {
  return (
    <Form {...form}>
      <form
        id="upload-transactions-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col"
      >
        <FormField
          control={form.control}
          name={'file'}
          render={({ field }) => {
            function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
              const file = event.target.files?.[0]
              field.onChange(file)
            }

            return (
              <FormItem className="flex w-full flex-col gap-2">
                <FormLabel htmlFor="planilha">Planilha</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="planilha"
                    type="file"
                    accept=".csv"
                    className="h-80 w-full"
                    value={undefined}
                    onChange={handleChange}
                  />
                </FormControl>
                {form.formState.errors.file ? (
                  <FormMessage>
                    {form.formState.errors.file.message}
                  </FormMessage>
                ) : (
                  <FormDescription>Selecione um arquivo .csv</FormDescription>
                )}
              </FormItem>
            )
          }}
        />
      </form>
    </Form>
  )
}
