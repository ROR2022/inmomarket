import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface PropertyCardProps {
  id?: string
  isFavorite?: boolean
}

export function PropertyCard({ id = "1", isFavorite = false }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Link href={`/propiedades/${id}`}>
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src="/casa1.jpeg"
              alt="Propiedad"
              width={500}
              height={300}
              priority
              className="object-cover w-full h-full transition-transform hover:scale-105"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${isFavorite ? "text-red-500" : ""}`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
        <Badge className="absolute top-2 left-2">Venta</Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Link href={`/propiedades/${id}`} className="hover:underline">
            <h3 className="font-bold text-lg line-clamp-1">Casa moderna con jardín</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-1">Colonia Roma, Ciudad de México</p>
        </div>

        <p className="font-bold text-lg">$2,500,000 MXN</p>

        <div className="flex gap-3 mt-3 text-sm text-muted-foreground">
          <div>3 hab.</div>
          <div>2 baños</div>
          <div>150 m²</div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/propiedades/${id}`}>Ver detalles</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/contacto/${id}`}>Contactar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
