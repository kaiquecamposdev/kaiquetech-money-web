import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TransactionsContext } from '@/contexts/TransactionsContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from '@phosphor-icons/react'
import { memo } from 'react'
import { useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'

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
        {...register('query')}
      />
      <Button
        className="flex items-center justify-center gap-3 p-4 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isSubmitting}
        size="icon"
        variant="outline"
      >
        <MagnifyingGlass size={24} />
        <span>Buscar</span>
      </Button>
    </form>
  )
}

export const SearchForm = memo(SearchFormComponent)
