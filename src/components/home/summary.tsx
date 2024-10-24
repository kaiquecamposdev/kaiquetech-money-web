import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
} from '@phosphor-icons/react'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useSummary } from '@/hooks/useSummary'
import { dayjs } from '@/lib/dayjs'
import { formatCurrency } from '@/utils/format-currency'

export function Summary() {
  const { summaryToTransactionType } = useSummary()

  return (
    <section className="w-full">
      <div className="inline-flex w-full gap-4 overflow-hidden">
        <Card className="flex w-full max-w-[400px] flex-col gap-2 rounded-md bg-card p-6">
          <CardHeader className="flex flex-row justify-between p-0">
            <p className="text-base text-muted-foreground">Faturamento Bruto</p>
            <ArrowCircleUp className="size-8 fill-green-500 dark:fill-green-700" />
          </CardHeader>
          <CardContent className="p-0">
            <h2 className="text-3xl font-bold text-secondary-foreground">
              {formatCurrency(summaryToTransactionType.incomes)}
            </h2>
          </CardContent>
          <CardFooter className="flex flex-row justify-between p-0">
            <p className="text-xs text-muted-foreground">
              Último faturamento em{' '}
              {dayjs(summaryToTransactionType.lastIncomesDate).format('lll')}
            </p>
          </CardFooter>
        </Card>
        <Card className="flex w-full max-w-[400px] flex-col gap-2 rounded-md bg-card p-6">
          <CardHeader className="flex flex-row justify-between p-0">
            <p className="text-base text-muted-foreground">Despesas</p>
            <ArrowCircleDown className="size-8 fill-red-500 dark:fill-red-700" />
          </CardHeader>
          <CardContent className="p-0">
            <h2 className="text-3xl font-bold text-secondary-foreground">
              {formatCurrency(summaryToTransactionType.expenses)}
            </h2>
          </CardContent>
          <CardFooter className="flex flex-row justify-between p-0">
            <p className="text-xs text-muted-foreground">
              Última despesa em{' '}
              {dayjs(summaryToTransactionType.lastExpensesDate).format('lll')}
            </p>
          </CardFooter>
        </Card>
        <Card className="flex w-full max-w-[400px] flex-col gap-2 rounded-md bg-primary p-6">
          <CardHeader className="flex flex-row justify-between p-0">
            <p className="text-base text-primary-foreground dark:text-secondary-foreground">
              Saldo
            </p>
            <CurrencyDollar className="size-8 text-primary-foreground dark:text-secondary-foreground" />
          </CardHeader>
          <CardContent className="p-0">
            <h2 className="text-3xl font-bold text-primary-foreground dark:text-secondary-foreground">
              {formatCurrency(
                summaryToTransactionType.incomes -
                  summaryToTransactionType.expenses * -1,
              )}
            </h2>
          </CardContent>
          <CardFooter className="flex flex-row justify-between p-0">
            <p className="text-xs text-primary-foreground dark:text-secondary-foreground">
              Saldo em{' '}
              {dayjs(summaryToTransactionType.lastExpensesDate).format('lll')}
            </p>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}
