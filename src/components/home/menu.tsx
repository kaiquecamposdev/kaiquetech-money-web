import { ArrowLeftRight, MenuIcon, PaintBucketIcon, Sheet } from 'lucide-react'
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
import { useTheme } from '@/contexts/ThemeProvider'

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
        <MenuIcon className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onSelect={() => setOpenCreateTransactionModal(true)}
        >
          <ArrowLeftRight className="h-4 w-4" />
          Criar transação
        </DropdownMenuItem>
        <DropdownMenuItem
          className="gap-2"
          onSelect={() => setOpenOptionsUploadTransactionsModal(true)}
        >
          <Sheet className="h-4 w-4" />
          Importar CSV
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            <PaintBucketIcon className="h-4 w-4" />
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
