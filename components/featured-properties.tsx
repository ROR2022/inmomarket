import { PropertyCard } from "@/components/property-card"

export function FeaturedProperties() {
  // This would be replaced with actual data fetching
  const featuredProperties = [1, 2, 3, 4, 5, 6]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredProperties.map((id) => (
        <PropertyCard key={id} id={id.toString()} title="Casa en el centro" location="Calle Principal 123" price={100000} currency="USD" operation="venta" bedrooms={3} bathrooms={2} area={150} imageUrl="/casa1.jpeg" />
      ))}
    </div>
  )
}
