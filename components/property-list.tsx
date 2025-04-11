import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PropertyListProps {
  isFavorites?: boolean
}

export function PropertyList({ isFavorites = false }: PropertyListProps) {
  // This would be replaced with actual data fetching
  const properties = [
    {
      id: "1",
      title: "Casa moderna con jardín",
      location: "Colonia Roma, Ciudad de México",
      price: "$2,500,000 MXN",
      type: "Casa",
      operation: "Venta",
      views: 120,
      messages: 5,
      status: "active",
    },
    {
      id: "2",
      title: "Departamento céntrico",
      location: "Polanco, Ciudad de México",
      price: "$15,000 MXN/mes",
      type: "Departamento",
      operation: "Alquiler",
      views: 85,
      messages: 3,
      status: "active",
    },
    {
      id: "3",
      title: "Oficina en zona financiera",
      location: "Reforma, Ciudad de México",
      price: "$35,000 MXN/mes",
      type: "Oficina",
      operation: "Alquiler",
      views: 40,
      messages: 2,
      status: "active",
    },
  ]

  return (
    <div className="space-y-4">
      {properties.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">
              {isFavorites ? "No tienes propiedades guardadas como favoritas" : "No tienes propiedades publicadas"}
            </p>
            <Button asChild>
              <Link href={isFavorites ? "/propiedades" : "/publicar"}>
                {isFavorites ? "Explorar propiedades" : "Publicar propiedad"}
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        properties.map((property) => (
          <Card key={property.id}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4">
                <div className="relative h-48 md:h-full">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 p-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold">{property.title}</h3>
                      <Badge>{property.operation}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
                    <p className="font-bold">{property.price}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    {!isFavorites && (
                      <>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="h-4 w-4" />
                          <span>{property.views} vistas</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{property.status === "active" ? "Activa" : "Inactiva"}</Badge>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {isFavorites ? (
                    <>
                      <Button size="sm" asChild>
                        <Link href={`/propiedades/${property.id}`}>Ver detalles</Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar de favoritos
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/propiedades/${property.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/editar/${property.id}`}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Link>
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  )
}
