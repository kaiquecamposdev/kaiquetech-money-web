import { Button } from '@/components/ui/button'
import { TransactionsContext } from '@/contexts/TransactionsContext'
import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { useContextSelector } from 'use-context-selector'

interface PaginationProps {
  pageIndex: number
  perPage?: number
  totalCount: number
}

export function Pagination({
  pageIndex,
  perPage = 10,
  totalCount,
}: PaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1
  const onChangePage = useContextSelector(
    TransactionsContext,
    ({ onChangePage }) => {
      return onChangePage
    },
  )

  function onDecreasePage() {
    if (pageIndex >= 1) {
      onChangePage(pageIndex - 1)
    }
  }
  function onIncreasePage() {
    if (pageIndex + 1 < pages) {
      onChangePage(pageIndex + 1)
    }
  }

  return (
    <div className="flex gap-2">
      <Button onClick={() => onDecreasePage()}>
        <CaretLeft size={16} /> Anterior
      </Button>
      {Array.from({
        length: pages,
      }).map((_, i) => {
        return (
          <Button
            key={i}
            className={pageIndex === i ? 'bg-primary' : 'bg-primary-foreground'}
            onClick={() => onChangePage(i)}
          >
            {i + 1}
          </Button>
        )
      })}
      <Button onClick={() => onIncreasePage()}>
        Próximo <CaretRight size={16} />
      </Button>
    </div>
  )
}
