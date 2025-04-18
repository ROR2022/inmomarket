import Link from "next/link"
import LegalLinks from "@/components/LegalLinks"

export default function Footer() {
  return (
    <footer className="border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">InmoMarket</h3>
            <p className="text-muted-foreground text-sm">
              Plataforma para compra, venta y alquiler de propiedades inmobiliarias.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/propiedades" className="text-sm hover:underline">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link href="/publicar" className="text-sm hover:underline">
                  Publicar propiedad
                </Link>
              </li>
              <li>
                <Link href="/agentes" className="text-sm hover:underline">
                  Agentes inmobiliarios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Información</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre-nosotros" className="text-sm hover:underline">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm hover:underline">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:underline">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <LegalLinks variant="vertical" className="text-sm" />
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InmoMarket. Todos los derechos reservados.</p>
          <LegalLinks variant="footer" className="mt-4" />
        </div>
      </div>
    </footer>
  )
}
