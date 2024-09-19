import { Transaction } from '@/contexts/TransactionsContext'

export function CreatePagination(currentPage: number, objects: Transaction[]) {
  const perPage = 20

  const maxPage = Math.ceil(objects.length / 20)
  const pagination: Transaction[][] = Array.from({ length: maxPage }, () => [])

  for (const object of objects) {
    if (pagination[currentPage].length === perPage) {
      currentPage++
    }

    pagination[currentPage].push(object)
  }

  return pagination
}
