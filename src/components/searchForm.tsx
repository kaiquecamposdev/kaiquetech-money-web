import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TransactionsContext } from '@/contexts/TransactionsContext'

const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })
  const onChangeSearch = useContextSelector(
    TransactionsContext,
    ({ onChangeSearch }) => {
      return onChangeSearch
    },
  )

  function handleSearchTransactions(data: SearchFormInputs) {
    onChangeSearch(data.query)
  }

  return (
    <form
      className="flex gap-6"
      onSubmit={handleSubmit(handleSearchTransactions)}
    >
      <Input
        type="text"
        placeholder="Busque por transações"
        className="p-4"
        {...register('query')}
      />
      <Button
        className="flex items-center justify-center gap-3 p-4 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSubmitting}
        variant="outline"
      >
        <Search className="h-5 w-5 text-secondary-foreground" />
        <span className="font-bold text-secondary-foreground">Buscar</span>
      </Button>
    </form>
  )
}

export const SearchForm = memo(SearchFormComponent)
