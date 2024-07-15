import { Card, CardHeader } from '@/components/ui/card'
import { useSummary } from '@/hooks/useSummary'
import { formatCurrency } from '@/utils/format-currency'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
} from '@phosphor-icons/react'

export function Summary() {
  const summary = useSummary()

  return (
    <section className="w-full">
      <div className="flex relative gap-8 overflow-x-hidden">
        <Card className="flex flex-col w-full max-w-[400px] gap-3 p-6 rounded-md bg-foreground">
          <CardHeader className="flex justify-between">
            <p className="text-base text-muted">Entradas</p>
            <ArrowCircleUp className="fill-green-500" size={32} />
          </CardHeader>
          <h2 className="text-4xl font-bold">
            {formatCurrency(summary.income)}
          </h2>
        </Card>
        <Card className="flex flex-col w-full max-w-[400px] gap-3 p-6 rounded-md bg-foreground">
          <CardHeader className="flex justify-between">
            <p className="text-base text-muted">Saídas</p>
            <ArrowCircleDown className="fill-red-500" size={32} />
          </CardHeader>
          <h2 className="text-4xl font-bold">
            {formatCurrency(-summary.outcome)}
          </h2>
        </Card>
        <Card className="bg-primary flex flex-col w-full max-w-[400px] gap-3 p-6 rounded-md">
          <CardHeader className="flex justify-between">
            <p>Total</p>
            <CurrencyDollar className="fill-muted" size={32} />
          </CardHeader>
          <h2 className="text-4xl font-bold">
            {formatCurrency(summary.total)}
          </h2>
        </Card>
      </div>
    </section>
  )
}
