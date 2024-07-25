import { Row } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Transaction } from '@/contexts/TransactionsContext'

import { ActionPaymentDetails } from './action-payment-details'

type ActionsRowProps = {
  row: Row<Transaction>
}

export function ActionsRow({ row }: ActionsRowProps) {
  const transaction = row.original

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(transaction.id)}
          >
            Copiar ID da transação
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Implementation continues... */}
          <DropdownMenuItem disabled={true}>
            Visualizar cliente
          </DropdownMenuItem>
          <ActionPaymentDetails transaction={transaction} />
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  )
}
