import React, { Suspense } from "react";
import { PropertyCard } from "@/components/property-card"
import { getFeaturedProperties } from "@/app/actionsProperties"
//import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

// Loading state component
function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] bg-muted animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded animate-pulse w-3/4" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
        <div className="h-6 bg-muted rounded animate-pulse w-1/3 mt-2" />
        <div className="flex gap-2 mt-3">
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
          <div className="h-4 w-12 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </Card>
  )
}

// Suspense fallback component
export function FeaturedPropertiesSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  )
}

export async function FeaturedProperties() {
  const properties = await getFeaturedProperties();

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-medium text-gray-600">No hay propiedades destacadas disponibles</h3>
        <p className="text-gray-500 mt-2">Vuelve a revisar pronto para ver nuestras nuevas propiedades.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          id={property.id}
          title={property.title}
          location={property.location}
          price={property.price}
          currency={property.currency}
          operation={property.operation || "venta"}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          area={property.area}
          imageUrl={property.mainImageUrl}
        />
      ))}
    </div>
  );
}

export default function FeaturedPropertiesWrapper() {
  return (
    <Suspense fallback={<FeaturedPropertiesSkeleton />}>
      <FeaturedProperties />
    </Suspense>
  );
}
