import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useContextSelector } from 'use-context-selector'

import { Button } from '@/components/ui/button'
import { TransactionsContext } from '@/contexts/TransactionsContext'

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
        <ChevronLeft className="h-4 w-4" /> Anterior
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
        Próximo <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
