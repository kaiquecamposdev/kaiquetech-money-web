import {
  ArrowsLeftRight,
  List,
  PaintBucket,
  Table,
} from '@phosphor-icons/react'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/providers/theme-provider'

import { Dialog } from '../ui/dialog'
import { CreateTransactionModal } from './modals/create-transaction-modal'
import { OptionsUploadTransactionsModal } from './modals/options-upload-transactions-modal'
import { UploadTransactionsModal } from './modals/upload-transactions-modal'

export function Menu() {
  const [openCreateTransactionModal, setOpenCreateTransactionModal] =
    useState(false)
  const [
    openOptionsUploadTransactionsModal,
    setOpenOptionsUploadTransactionsModal,
  ] = useState(false)
  const [openUploadTransactionsModal, setOpenUploadTransactionsModal] =
    useState(false)

  const [position, setPosition] = useState('system')
  const { setTheme } = useTheme()

  function onOpenUploadTransactionsModal(value: boolean) {
    setOpenOptionsUploadTransactionsModal(false)
    setOpenUploadTransactionsModal(value)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <List className="size-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={() => setOpenCreateTransactionModal(true)}
        >
          <ArrowsLeftRight className="size-4" />
          Criar transação
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onSelect={() => setOpenOptionsUploadTransactionsModal(true)}
        >
          <Table className="size-4" />
          Importar CSV
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center gap-2">
            <PaintBucket className="size-4" />
            Alterar tema
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem
                  value="light"
                  onClick={() => setTheme('light')}
                >
                  Claro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="dark"
                  onClick={() => setTheme('dark')}
                >
                  Escuro
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="system"
                  onClick={() => setTheme('system')}
                >
                  Sistema
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>

      <Dialog
        open={openCreateTransactionModal}
        onOpenChange={setOpenCreateTransactionModal}
      >
        <CreateTransactionModal
          setOpenCreateTransactionModal={setOpenCreateTransactionModal}
        />
      </Dialog>

      <Dialog
        open={openOptionsUploadTransactionsModal}
        onOpenChange={setOpenOptionsUploadTransactionsModal}
      >
        <OptionsUploadTransactionsModal
          onOpenChange={onOpenUploadTransactionsModal}
        />
      </Dialog>

      <Dialog
        open={openUploadTransactionsModal}
        onOpenChange={setOpenUploadTransactionsModal}
      >
        <UploadTransactionsModal
          setOpenUploadTransactionsModal={setOpenUploadTransactionsModal}
        />
      </Dialog>
    </DropdownMenu>
  )
}
