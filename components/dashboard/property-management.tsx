'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Property, PaginationInfo } from "@/types/property";

interface PropertyManagementProps {
  initialProperties: Property[];
  initialPagination: PaginationInfo;
}

export default function PropertyManagement({ 
  initialProperties, 
  initialPagination 
}: PropertyManagementProps) {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [pagination, setPagination] = useState<PaginationInfo>(initialPagination);

  return (
    <div className="space-y-4">
      {properties.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">
              No tienes propiedades publicadas
            </p>
            <Button asChild>
              <Link href="/publicar">
                Publicar propiedad
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {properties.map((property) => (
            <Card key={property.id}>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4">
                  <div className="relative h-48 md:h-full">
                    <Image
                      src={property.mainImageUrl || "/placeholder.svg?height=300&width=500"}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
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
                      <p className="font-bold">{property.currency} {property.price.toLocaleString()}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{property.status === "active" ? "Activa" : "Inactiva"}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
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
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={page === pagination.currentPage ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      // Here you would implement pagination handling
                      // For now, just a placeholder
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
} 