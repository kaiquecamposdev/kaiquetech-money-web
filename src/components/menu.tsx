import {
  ArrowLeftRight,
  MenuIcon,
  Moon,
  PaintBucketIcon,
  Settings,
  Sheet,
  Sun,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/contexts/ThemeProvider'

export function Menu() {
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
              <DropdownMenuItem
                className="gap-2"
                onClick={() => setTheme('light')}
              >
                <Sun className="h-4 w-4" />
                <span>Claro</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => setTheme('dark')}
              >
                <Moon className="h-4 w-4" />
                <span>Escuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => setTheme('system')}
              >
                <Settings className="h-4 w-4" />
                <span>Sistema</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
