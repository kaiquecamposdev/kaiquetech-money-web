import { ChevronRight, Download, Upload } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface OptionsUploadTransactionsModalProps {
  onOpenChange: (open: boolean) => void
}

export function OptionsUploadTransactionsModal({
  onOpenChange,
}: OptionsUploadTransactionsModalProps) {
  return (
    <>
      <DialogContent className="h-full max-h-80 w-full max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar transações em massa</DialogTitle>
          <DialogDescription>
            Preencha os dados da transação a partir de uma planilha e cadastre
            muitas transações de uma vez.
          </DialogDescription>
        </DialogHeader>

        <Button variant="ghost" className="p-10">
          <a
            href="/src/assets/example.csv"
            className="flex w-full items-center justify-between gap-2"
            download
          >
            <div className="rounded-full border border-muted-foreground p-1">
              <Download className="h-8 w-8 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="bold text-left text-secondary-foreground">
                Baixe uma planilha .csv para criar suas transações
              </h2>
              <p className="text-muted-foreground">
                Configure a planilha com as categorias e produtos.
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-secondary-foreground" />
          </a>
        </Button>
        <Button
          className="flex items-center justify-between gap-2 p-10"
          variant="ghost"
          onClick={() => onOpenChange(true)}
        >
          <div className="rounded-full border border-muted-foreground p-1">
            <Upload className="h-8 w-8 text-secondary-foreground" />
          </div>

          <div>
            <h2 className="bold text-left text-secondary-foreground">
              Envie a planilha .csv que você configurou
            </h2>
            <p className="text-muted-foreground">
              As informações serão validadas e cadastradas.
            </p>
          </div>

          <ChevronRight className="h-4 w-4 text-secondary-foreground" />
        </Button>

        <DialogFooter></DialogFooter>
      </DialogContent>
    </>
  )
}
