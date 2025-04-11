import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"

export function MobileNav() {
  // This would be replaced with actual auth logic
  const isLoggedIn = false

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>InmoMarket</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <nav className="flex flex-col gap-4">
            <Link href="/propiedades" className="text-sm font-medium hover:text-primary">
              Propiedades
            </Link>
            <Link href="/agentes" className="text-sm font-medium hover:text-primary">
              Agentes
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
            <Link href="/contacto" className="text-sm font-medium hover:text-primary">
              Contacto
            </Link>
          </nav>

          {!isLoggedIn && (
            <div className="flex flex-col gap-2 mt-6">
              <Button variant="outline" asChild className="w-full">
                <Link href="/auth/login">Iniciar sesión</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/auth/register">Registrarse</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
