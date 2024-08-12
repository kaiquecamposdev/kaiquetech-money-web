import { Logo } from '@/icons/logo'

import { Menu } from './menu'

export function Header() {
  return (
    <header className="flex w-full items-center justify-between py-6">
      <h1 className="flex select-none items-center gap-3 text-2xl font-bold">
        <Logo className="h-10 w-10 fill-secondary-foreground" />
        KaiqueTech
      </h1>
      <Menu />
    </header>
  )
}
