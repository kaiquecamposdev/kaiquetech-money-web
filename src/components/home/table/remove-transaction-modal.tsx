import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Transaction } from '@/contexts/TransactionsContext'

type RemoveTransactionModalProps = {
  transaction: Transaction
  onRemoveTransaction: (id: string) => void
}

export function RemoveTransactionModal({
  transaction,
  onRemoveTransaction,
}: RemoveTransactionModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Excluir transação</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir a transação?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancelar</Button>
        </DialogClose>
        <DialogClose
          onClick={() => onRemoveTransaction(transaction.id)}
          asChild
        >
          <Button variant="destructive">Sim</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
