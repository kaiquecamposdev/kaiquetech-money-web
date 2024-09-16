import { Button } from '@/components/ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

type RemoveTransactionModalProps = {
  transactionId: string
  onRemoveTransaction: (id: string) => void
}

export function RemoveTransactionModal({
  transactionId,
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
        <DialogClose onClick={() => onRemoveTransaction(transactionId)} asChild>
          <Button variant="destructive">Sim</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
