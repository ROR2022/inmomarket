"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchBarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Inicializar estado con valores de URL si existen
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || "");
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || "all");
  const [operation, setOperation] = useState(searchParams.get('operation') || "all");

  // Actualizar estado si cambian los parámetros URL
  useEffect(() => {
    setSearchTerm(searchParams.get('search') || "");
    setPropertyType(searchParams.get('type') || "all");
    setOperation(searchParams.get('operation') || "all");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construir URL con parámetros de búsqueda
    const params = new URLSearchParams();
    
    // Añadir parámetros solo si tienen valor y no son el valor por defecto "all"
    if (searchTerm) params.set('search', searchTerm);
    if (propertyType && propertyType !== "all") params.set('type', propertyType);
    if (operation && operation !== "all") params.set('operation', operation);
    
    // Preservar otros filtros que podrían estar activos
    const currentParams = new URLSearchParams(searchParams.toString());
    ['minPrice', 'maxPrice', 'minArea', 'maxArea', 'features'].forEach(param => {
      if (currentParams.has(param)) {
        params.set(param, currentParams.get(param)!);
      }
    });
    
    // Resetear la paginación cuando se hace una nueva búsqueda
    params.delete('page');
    
    // Redirigir a la página de exploración con los filtros
    router.push(`/explorar${params.toString() ? `?${params.toString()}` : ''}`);
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar por ubicación, nombre, etc."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Select value={propertyType} onValueChange={setPropertyType}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Tipo de propiedad" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          <SelectItem value="casa">Casa</SelectItem>
          <SelectItem value="departamento">Departamento</SelectItem>
          <SelectItem value="terreno">Terreno</SelectItem>
          <SelectItem value="oficina">Oficina</SelectItem>
          <SelectItem value="local">Local comercial</SelectItem>
        </SelectContent>
      </Select>

      <Select value={operation} onValueChange={setOperation}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Operación" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las operaciones</SelectItem>
          <SelectItem value="venta">Venta</SelectItem>
          <SelectItem value="alquiler">Alquiler</SelectItem>
          <SelectItem value="alquiler_temporal">Alquiler temporal</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit">Buscar</Button>
    </form>
  )
}

export function SearchBar() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchBarContent />
    </Suspense>
  )
}
