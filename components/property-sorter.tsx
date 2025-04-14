"use client"

import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Suspense } from 'react';

interface PropertySorterProps {
  defaultValue?: string;
}

function PropertySorterContent({ defaultValue = 'date_desc' }: PropertySorterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Añadir o actualizar el parámetro sort
    params.set('sort', value);
    
    // Redirigir manteniendo los demás parámetros
    router.push(`/explorar?${params.toString()}`);
  };
  
  return (
    <Select defaultValue={defaultValue} onValueChange={handleSortChange}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="date_desc">Más recientes</SelectItem>
        <SelectItem value="price_asc">Precio (menor a mayor)</SelectItem>
        <SelectItem value="price_desc">Precio (mayor a menor)</SelectItem>
        <SelectItem value="date_asc">Más antiguos</SelectItem>
      </SelectContent>
    </Select>
  )
}

export function PropertySorter({ defaultValue = 'date_desc' }: PropertySorterProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertySorterContent defaultValue={defaultValue} />
    </Suspense>
  )
}
