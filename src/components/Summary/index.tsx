import { useSummary } from '@/hooks/useSummary'
import { formatCurrency } from '@/utils/format-currency'
import {
  ArrowCircleDown,
  ArrowCircleUp,
  CurrencyDollar,
} from '@phosphor-icons/react'
import { Card, CardHeader, SummaryContainer, SummaryContent } from './styles'

export function Summary() {
  const summary = useSummary()

  return (
    <SummaryContainer>
      <SummaryContent>
        <Card $variant="income">
          <CardHeader $variant="income">
            <p>Entradas</p>
            <ArrowCircleUp size={32} />
          </CardHeader>
          <h2>{formatCurrency(summary.income)}</h2>
        </Card>
        <Card $variant="outcome">
          <CardHeader $variant="outcome">
            <p>Saídas</p>
            <ArrowCircleDown size={32} />
          </CardHeader>
          <h2>{formatCurrency(-summary.outcome)}</h2>
        </Card>
        <Card $variant="total">
          <CardHeader $variant="total">
            <p>Total</p>
            <CurrencyDollar size={32} />
          </CardHeader>
          <h2>{formatCurrency(summary.total)}</h2>
        </Card>
      </SummaryContent>
    </SummaryContainer>
  )
}
