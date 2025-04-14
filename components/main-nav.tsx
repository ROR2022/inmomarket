import Link from "next/link"

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/explorar" className="text-sm font-medium hover:text-primary">
        Explorar
      </Link>
      <Link href="/publicar" className="text-sm font-medium hover:text-primary">
        Publicar
      </Link>
      <Link href="/contacto" className="text-sm font-medium hover:text-primary">
        Contacto
      </Link>
    </nav>
  )
}
