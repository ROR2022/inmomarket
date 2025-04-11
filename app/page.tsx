import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { FeaturedProperties } from "@/components/featured-properties"
import { HeroSection } from "@/components/hero-section"
import { PropertyTypeFilter } from "@/components/property-type-filter"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeroSection />

      <section className="my-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Encuentra tu propiedad ideal</h2>
          <SearchBar />
        </div>

        <PropertyTypeFilter />
      </section>

      <section className="my-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Propiedades destacadas</h2>
          <Button variant="outline" asChild>
            <a href="/propiedades">Ver todas</a>
          </Button>
        </div>

        <FeaturedProperties />
      </section>

      <section className="my-12 bg-muted p-8 rounded-lg">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">¿Quieres vender o alquilar tu propiedad?</h2>
          <p className="text-muted-foreground mb-6">
            Publica tu propiedad en InmoMarket y conecta con compradores o inquilinos interesados.
          </p>
          <Button size="lg" asChild>
            <a href="/publicar">Publicar propiedad</a>
          </Button>
        </div>
      </section>
    </div>
  )
}
