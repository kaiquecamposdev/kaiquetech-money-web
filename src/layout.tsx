import { Header } from './components/home/header'

export function LayoutRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      {children}
    </div>
  )
}
