import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Transaction } from '@/contexts/TransactionsContext'
import { dayjs } from '@/lib/dayjs'
import { formatCurrency } from '@/utils/format-currency'

type PaymentDetailsTableProps = {
  transaction: Transaction
}

export function PaymentDetailsTable({ transaction }: PaymentDetailsTableProps) {
  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>ID:</TableCell>
            <TableCell>{transaction.id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cliente:</TableCell>
            <TableCell>{transaction.client}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Descrição:</TableCell>
            <TableCell>{transaction.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Categoria:</TableCell>
            <TableCell>{transaction.category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Subcategoria:</TableCell>
            <TableCell>{transaction.subCategory}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Valor:</TableCell>
            <TableCell>{formatCurrency(transaction.price)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data:</TableCell>
            <TableCell>{dayjs(transaction.date).format('lll')}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Descrição</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Desconto</TableHead>
            <TableHead>Taxa</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{transaction.description}</TableCell>
            <TableCell className="text-right">
              {formatCurrency(transaction.price ?? 0)}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(transaction.discount ?? 0)}
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(transaction.tax ?? 0)}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total da transação</TableCell>
            <TableCell className="text-right font-medium">
              {formatCurrency(
                transaction.price -
                  (transaction.discount || 0) -
                  (transaction.tax || 0),
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  )
}
