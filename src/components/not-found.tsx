import { Searching } from '@/icons/searching'

export function NotFound() {
  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center gap-3">
      <Searching className="h-40 w-40 text-primary" />
      <h2 className="text-muted-foreground">Carregando transações...</h2>
    </div>
  )
}
