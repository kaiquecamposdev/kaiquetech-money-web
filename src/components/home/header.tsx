import { Logo } from '@/icons/logo'

import { Menu } from './menu'

export function Header() {
  return (
    <header className="-mt-[1px] flex h-16 w-full items-center justify-center border-b border-muted px-6 py-4">
      <nav className="flex w-full max-w-7xl items-center justify-between">
        <div className="inline-flex select-none gap-3">
          <Logo className="size-8 fill-secondary-foreground" />
          <h1 className="flex items-center text-2xl font-bold">Kaiquetech.</h1>
        </div>

        <Menu />
      </nav>
    </header>
  )
}
