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

export function Menu() {
  const [position, setPosition] = useState('system')

  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2">
          <ArrowLeftRight className="h-4 w-4" />
          Criar transação
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
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
    </DropdownMenu>
  )
}
