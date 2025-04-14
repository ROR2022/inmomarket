"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const supabase = createClient()
  const [dataUser, setDataUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setDataUser(user)
    }
    fetchUser()
    return () => {
      setDataUser(null)
    }
  },[open]);
  

  //console.log('mobile-nav user: ', dataUser)

  // Function to handle link clicks
  const handleLinkClick = () => {
    setOpen(false) // Close the sheet when link is clicked
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>InmoMarket</SheetTitle>
          <SheetDescription>
            Navegación del sitio
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <nav className="flex flex-col gap-4">
            <Link href="/explorar" className="text-sm font-medium hover:text-primary" onClick={handleLinkClick}>
              Explorar
            </Link>
            <Link href="/publicar" className="text-sm font-medium hover:text-primary" onClick={handleLinkClick}>
              Publicar
            </Link>
            <Link href="/contacto" className="text-sm font-medium hover:text-primary" onClick={handleLinkClick}>
              Contacto
            </Link>
          </nav>

          {!dataUser && (
            <div className="flex flex-col gap-2 mt-6">
              <Button variant="outline" asChild className="w-full" onClick={handleLinkClick}>
                <Link href="/sign-in">Iniciar sesión</Link>
              </Button>
              <Button asChild className="w-full" onClick={handleLinkClick}>
                <Link href="/sign-up">Registrarse</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
