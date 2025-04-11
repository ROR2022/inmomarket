import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"

export default function Header() {
  // This would be replaced with actual auth logic
  const isLoggedIn = false

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl mr-8">
              InmoMarket
            </Link>
            <MainNav />
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />

            {isLoggedIn ? (
              <UserNav />
            ) : (
              <div className="hidden md:flex gap-2">
                <Button variant="outline" asChild>
                  <Link href="/sign-in">Iniciar sesión</Link>
                </Button>
                <Button asChild>
                  <Link href="/sign-up">Registrarse</Link>
                </Button>
              </div>
            )}

            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
