import Link from "next/link"

export function MainNav() {
  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link href="/propiedades" className="text-sm font-medium hover:text-primary">
        Propiedades
      </Link>
      <Link href="/agentes" className="text-sm font-medium hover:text-primary">
        Agentes
      </Link>
      <Link href="/contacto" className="text-sm font-medium hover:text-primary">
        Contacto
      </Link>
    </nav>
  )
}
