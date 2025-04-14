import { Suspense } from 'react';
import { Container } from '@/components/Container';
import { SearchBar } from '@/components/search-bar';
import { PropertyFilters } from '@/components/property-filters';
import { PropertyCard } from '@/components/property-card';
import { getProperties } from '@/app/actionsProperties';
import { Separator } from '@/components/ui/separator';
import { Link, MapPin } from "lucide-react"
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
//import { Pagination } from '@/components/ui/pagination';
import type { Property, SearchParams } from '@/types/property';
import { PropertySorter } from '@/components/property-sorter';
import { PaginationExplorar } from '@/components/pagination-explorar';

export const metadata = {
  title: "Explorar Propiedades | InmoMarket",
  description: "Descubre casas, departamentos, terrenos y más propiedades inmobiliarias en InmoMarket."
};

interface ExplorarPageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
    operation?: string;
    minPrice?: string;
    maxPrice?: string;
    minArea?: string;
    maxArea?: string;
    features?: string;
    page?: string;
    sort?: string;
  }>;
}

export default async function ExplorarPage({ searchParams }: ExplorarPageProps) {
  // Convertir parámetros a los tipos correctos
  const paramsTemp = await searchParams;
  const params = {
    search: paramsTemp.search,
    type: paramsTemp.type,
    operation: paramsTemp.operation,
    minPrice: paramsTemp.minPrice ? parseInt(paramsTemp.minPrice) : undefined,
    maxPrice: paramsTemp.maxPrice ? parseInt(paramsTemp.maxPrice) : undefined,
    minArea: paramsTemp.minArea ? parseInt(paramsTemp.minArea) : undefined,
    maxArea: paramsTemp.maxArea ? parseInt(paramsTemp.maxArea) : undefined,
    features: paramsTemp.features ? paramsTemp.features.split(',') : undefined,
    page: paramsTemp.page ? parseInt(paramsTemp.page) : 1,
    sort: paramsTemp.sort || 'date_desc'
  };

  const { properties, pagination } = await getProperties(params as SearchParams);
  
  //console.log('properties:', properties);

  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Explorar Propiedades</h1>
          <p className="text-muted-foreground mb-6">
            Encuentra la propiedad ideal para ti entre nuestra amplia selección de inmuebles
          </p>
          <SearchBar />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <PropertyFilters />
          </div>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1">Resultados</h2>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" strokeWidth={2.5} />
                    {params.search || "Todas las ubicaciones"}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <p className="text-sm text-muted-foreground whitespace-nowrap">
                    {pagination.totalItems} propiedad{pagination.totalItems !== 1 ? 'es' : ''}
                  </p>
                  <Separator orientation="vertical" className="h-5 mx-1 hidden sm:block" />
                  <PropertySorter defaultValue={params.sort} />
                </div>
              </div>

              {properties.length === 0 ? (
                <div className="py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No se encontraron propiedades</h3>
                  <p className="text-muted-foreground mb-6">Intenta con otros filtros o amplía tu búsqueda</p>
                  <Button variant="outline" asChild>
                    <Link href="/explorar">Ver todas las propiedades</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Suspense fallback={Array(6).fill(0).map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-[200px] w-full rounded-lg" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  ))}>
                    {properties.map((property: Property) => (
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
                        imageUrl={property.mainImageUrl || "/casa1.jpeg"}
                      />
                    ))}
                  </Suspense>
                </div>
              )}
              
              {pagination.totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <PaginationExplorar 
                    currentPage={pagination.currentPage} 
                    totalPages={pagination.totalPages} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 