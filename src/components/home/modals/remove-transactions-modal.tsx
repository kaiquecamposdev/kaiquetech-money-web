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
  transactionsId: string[]
  removeSelectedTransactions: (id: string[]) => void
}

export function RemoveTransactionsModal({
  transactionsId,
  removeSelectedTransactions,
}: RemoveTransactionModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Excluir transações</DialogTitle>
        <DialogDescription>
          Tem certeza que deseja excluir as transações?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancelar</Button>
        </DialogClose>
        <DialogClose
          onClick={() => removeSelectedTransactions(transactionsId)}
          asChild
        >
          <Button variant="destructive">Sim</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}
