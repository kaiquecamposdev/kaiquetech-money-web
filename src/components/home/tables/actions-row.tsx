import { Row } from '@tanstack/react-table'
import { useState } from 'react'

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
import { Transaction } from '@/providers/transactions-provider'

import { ActionPaymentDetailsModal } from '../modals/action-payment-details-modal'

type ActionsRowProps = {
  row: Row<Transaction>
}

export function ActionsRow({ row }: ActionsRowProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const transaction = row.original

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Abrir menu</span>
          {/* <MoreHorizontal className="size-4" /> */}
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
        <DropdownMenuItem disabled>Visualizar cliente</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
          Visualizar detalhes do pagamento
        </DropdownMenuItem>
      </DropdownMenuContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <ActionPaymentDetailsModal
          transaction={transaction}
          onOpenDialogChange={setIsDialogOpen}
        />
      </Dialog>
    </DropdownMenu>
  )
}
