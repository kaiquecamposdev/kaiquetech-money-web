import { ArrowDownCircle, ArrowUpCircle, DollarSign } from 'lucide-react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useSummary } from '@/hooks/useSummary'
import { dayjs } from '@/lib/dayjs'
import { formatCurrency } from '@/utils/format-currency'

export function Summary() {
  const summary = useSummary()

  return (
    <section className="relative flex w-full gap-4 overflow-x-hidden">
      <Card className="flex w-full max-w-[400px] flex-col gap-2 rounded-md bg-card p-6">
        <CardHeader className="flex flex-row justify-between p-0">
          <p className="font-noto text-base text-muted-foreground">
            Faturamento Bruto
          </p>
          <ArrowUpCircle className="h-8 w-8 fill-green-500 dark:fill-green-700" />
        </CardHeader>
        <CardContent className="p-0">
          <h2 className="text-3xl font-bold text-secondary-foreground">
            {formatCurrency(summary.grossRevenue)}
          </h2>
        </CardContent>
        <CardFooter className="flex flex-row justify-between p-0">
          <p className="font-noto text-xs text-muted-foreground">
            Último faturamento em{' '}
            {dayjs(summary.lastGrossRevenueDate).format('lll')}
          </p>
        </CardFooter>
      </Card>

      <Card className="flex w-full max-w-[400px] flex-col gap-2 rounded-md bg-card p-6">
        <CardHeader className="flex flex-row justify-between p-0">
          <p className="font-noto text-base text-muted-foreground">Despesas</p>
          <ArrowDownCircle className="h-8 w-8 fill-red-500 dark:fill-red-700" />
        </CardHeader>
        <CardContent className="p-0">
          <h2 className="text-3xl font-bold text-secondary-foreground">
            {formatCurrency(summary.expenses)}
          </h2>
        </CardContent>
        <CardFooter className="flex flex-row justify-between p-0">
          <p className="font-noto text-xs text-muted-foreground">
            Última despesa em {dayjs(summary.lastExpensesDate).format('lll')}
          </p>
        </CardFooter>
      </Card>

      <Card className="flex w-full max-w-[400px] flex-col gap-2 rounded-md bg-primary p-6">
        <CardHeader className="flex flex-row justify-between p-0">
          <p className="font-noto text-base text-primary-foreground dark:text-secondary-foreground">
            Total
          </p>
          <DollarSign className="h-8 w-8 text-primary-foreground dark:text-secondary-foreground" />
        </CardHeader>
        <CardContent className="p-0">
          <h2 className="text-3xl font-bold text-primary-foreground dark:text-secondary-foreground">
            {formatCurrency(summary.total)}
          </h2>
        </CardContent>
        <CardFooter className="flex flex-row justify-between p-0">
          <p className="font-noto text-xs text-primary-foreground dark:text-secondary-foreground">
            Saldo em {dayjs(summary.lastExpensesDate).format('lll')}
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}
