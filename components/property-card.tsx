import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  currency: string
  operation: string
  bedrooms?: number
  bathrooms?: number
  area?: number
  imageUrl?: string
  isFavorite?: boolean
}

export function PropertyCard({ 
  id, 
  title, 
  location, 
  price, 
  currency, 
  operation, 
  bedrooms, 
  bathrooms, 
  area, 
  imageUrl = "/casa1.jpeg", 
  isFavorite = false 
}: PropertyCardProps) {
  // Formato del precio con separador de miles
  const formattedPrice = new Intl.NumberFormat('es-MX', { 
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(price);
  
  // Mapeo de tipos de operación a etiquetas
  const operationLabels: Record<string, string> = {
    'venta': 'Venta',
    'alquiler': 'Alquiler',
    'alquiler_temporal': 'Temporal'
  };
  
  // Etiqueta de operación a mostrar
  const operationLabel = operationLabels[operation] || 'Venta';
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative">
        <Link href={`/propiedades/${id}`}>
          <div className="aspect-[16/9] overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
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
        <Badge className="absolute top-2 left-2" variant={operation === 'venta' ? 'default' : 'secondary'}>
          {operationLabel}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Link href={`/propiedades/${id}`} className="hover:underline">
            <h3 className="font-bold text-lg line-clamp-1">{title}</h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-1">{location}</p>
        </div>

        <p className="font-bold text-lg">${formattedPrice} {currency}</p>

        <div className="flex gap-3 mt-3 text-sm text-muted-foreground">
          {bedrooms !== undefined && <div>{bedrooms} hab.</div>}
          {bathrooms !== undefined && <div>{bathrooms} baños</div>}
          {area !== undefined && <div>{area} m²</div>}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/propiedades/${id}`}>Ver detalles</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href={`/contacto?property=${id}`}>Contactar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
