import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useSummary } from '@/hooks/useSummary'
import { formatCurrency } from '@/utils/format-currency'

export function Summary() {
  const summary = useSummary()

  return (
    <section className="relative flex w-full gap-6 overflow-x-hidden">
      <Card className="flex w-full max-w-[400px] flex-col gap-3 rounded-md bg-card p-6">
        <CardHeader className="flex flex-row justify-between p-0">
          <p className="text-base text-muted-foreground">Entradas</p>
          <ArrowUpCircle className="h-8 w-8 fill-green-500 dark:fill-green-700" />
        </CardHeader>
        <CardContent className="p-0">
          <h2 className="text-3xl font-bold text-secondary-foreground">
            {formatCurrency(summary.income)}
          </h2>
        </CardContent>
      </Card>

      <Card className="flex w-full max-w-[400px] flex-col gap-3 rounded-md bg-card p-6">
        <CardHeader className="flex flex-row justify-between p-0">
          <p className="text-base text-muted-foreground">Saídas</p>
          <ArrowDownCircle className="h-8 w-8 fill-red-500 dark:fill-red-700" />
        </CardHeader>
        <CardContent className="p-0">
          <h2 className="text-3xl font-bold text-secondary-foreground">
            {formatCurrency(-summary.outcome)}
          </h2>
        </CardContent>
      </Card>

      <Card className="flex w-full max-w-[400px] flex-col gap-3 rounded-md bg-primary p-6">
        <CardHeader className="flex flex-row justify-between p-0">
          <p className="text-base text-primary-foreground dark:text-secondary-foreground">
            Total
          </p>
          <DollarSign className="h-8 w-8 text-primary-foreground dark:text-secondary-foreground" />
        </CardHeader>
        <CardContent className="p-0">
          <h2 className="text-3xl font-bold text-primary-foreground dark:text-secondary-foreground">
            {formatCurrency(summary.total)}
          </h2>
        </CardContent>
      </Card>
    </section>
  )
}
