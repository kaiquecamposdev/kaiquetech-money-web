import { Searching } from '@/icons/searching'

export function Loading() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3">
      <Searching className="size-40 text-primary" />
      <h2 className="text-muted-foreground">Carregando transações...</h2>
    </div>
  )
}
