import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 z-0" />
      <div className="absolute inset-0 bg-[url('/casa2.jpeg')] bg-cover bg-center opacity-20 z-[-1]" />

      <div className="container relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra el hogar de tus sueños</h1>
          <p className="text-xl mb-8 text-muted-foreground">
            InmoMarket te conecta con las mejores propiedades en venta y alquiler. Explora miles de opciones y encuentra
            la que mejor se adapte a tus necesidades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/explorar">Explorar propiedades</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/publicar">Publicar propiedad</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
