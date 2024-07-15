import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Logo } from '@/icons/Logo'

export function Header() {
  return (
    <>
      <header className="w-full">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-bold text-3xl items-center flex">
            <Logo />
            KaiqueTech
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger>Nova transação</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Única</DropdownMenuItem>
              <DropdownMenuItem>Várias</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Dialog.Root>
            <Dialog.Trigger className="flex items-center justify-center px-">
              Nova Transação
            </Dialog.Trigger>
            <Dialog.Portal>
              <NewTransactionModal />
            </Dialog.Portal>
          </Dialog.Root> */}
        </div>
      </header>
    </>
  )
}
