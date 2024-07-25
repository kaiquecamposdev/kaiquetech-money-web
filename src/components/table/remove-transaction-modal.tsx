import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Transaction } from '@/contexts/TransactionsContext'

type RemoveTransactionModalProps = {
  onRemoveTransaction: (id: string) => void
  transaction: Transaction
}

export function RemoveTransactionModal({
  transaction,
  onRemoveTransaction,
}: RemoveTransactionModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Excluir</Button>
      </DialogTrigger>

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
            asChild
            onClick={() => onRemoveTransaction(transaction.id)}
          >
            <Button variant="destructive">Sim</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
