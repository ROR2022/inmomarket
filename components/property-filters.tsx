"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

// Lista de características disponibles para filtrar
const availableFeatures = [
  "Piscina", "Jardín", "Garaje", "Seguridad 24h", "Amueblado", 
  "Aire acondicionado", "Calefacción", "Terraza", "Ascensor"
];

function PropertyFiltersContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Estado inicial basado en los parámetros URL
  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get('minPrice')) || 500000,
    Number(searchParams.get('maxPrice')) || 5000000
  ]);
  
  const [areaRange, setAreaRange] = useState([
    Number(searchParams.get('minArea')) || 50,
    Number(searchParams.get('maxArea')) || 500
  ]);
  
  const [selectedTypes, setSelectedTypes] = useState<string[]>(() => {
    const typeParam = searchParams.get('type');
    return typeParam ? [typeParam] : [];
  });
  
  const [selectedOperations, setSelectedOperations] = useState<string[]>(() => {
    const operationParam = searchParams.get('operation');
    return operationParam ? [operationParam] : [];
  });
  
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(() => {
    const featuresParam = searchParams.get('features');
    return featuresParam ? featuresParam.split(',') : [];
  });
  
  // Actualizar el estado si cambian los parámetros URL
  useEffect(() => {
    const minPrice = Number(searchParams.get('minPrice'));
    const maxPrice = Number(searchParams.get('maxPrice'));
    if (minPrice || maxPrice) {
      setPriceRange([
        minPrice || 500000,
        maxPrice || 5000000
      ]);
    }
    
    const minArea = Number(searchParams.get('minArea'));
    const maxArea = Number(searchParams.get('maxArea'));
    if (minArea || maxArea) {
      setAreaRange([
        minArea || 50,
        maxArea || 500
      ]);
    }
    
    const typeParam = searchParams.get('type');
    if (typeParam !== null) {
      setSelectedTypes([typeParam]);
    } else {
      setSelectedTypes([]);
    }
    
    const operationParam = searchParams.get('operation');
    if (operationParam !== null) {
      setSelectedOperations([operationParam]);
    } else {
      setSelectedOperations([]);
    }
    
    const featuresParam = searchParams.get('features');
    if (featuresParam !== null) {
      setSelectedFeatures(featuresParam.split(','));
    } else {
      setSelectedFeatures([]);
    }
  }, [searchParams]);
  
  // Aplicar filtros
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Precio
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    // Área
    params.set('minArea', areaRange[0].toString());
    params.set('maxArea', areaRange[1].toString());
    
    // Tipo de propiedad (solo permitimos uno a la vez por ahora)
    if (selectedTypes.length > 0 && selectedTypes[0] !== "all") {
      params.set('type', selectedTypes[0]);
    } else {
      params.delete('type');
    }
    
    // Operación (solo permitimos una a la vez por ahora)
    if (selectedOperations.length > 0 && selectedOperations[0] !== "all") {
      params.set('operation', selectedOperations[0]);
    } else {
      params.delete('operation');
    }
    
    // Características
    if (selectedFeatures.length > 0) {
      params.set('features', selectedFeatures.join(','));
    } else {
      params.delete('features');
    }
    
    // Resetear paginación
    params.delete('page');
    
    // Navegar con los nuevos filtros
    router.push(`/explorar?${params.toString()}`);
  };
  
  // Limpiar todos los filtros
  const clearFilters = () => {
    // Resetear estado local
    setPriceRange([500000, 5000000]);
    setAreaRange([50, 500]);
    setSelectedTypes([]);
    setSelectedOperations([]);
    setSelectedFeatures([]);
    
    // Preservar solo el parámetro de búsqueda si existe
    const params = new URLSearchParams();
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      params.set('search', searchTerm);
    }
    
    // Navegar con filtros limpios
    router.push(`/explorar${params.toString() ? `?${params.toString()}` : ''}`);
  };

  // Manejo de selección de tipo de propiedad
  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([type]); // Solo permitimos uno a la vez por ahora
    } else {
      setSelectedTypes([]);
    }
  };
  
  // Manejo de selección de operación
  const handleOperationChange = (operation: string, checked: boolean) => {
    if (checked) {
      setSelectedOperations([operation]); // Solo permitimos uno a la vez por ahora
    } else {
      setSelectedOperations([]);
    }
  };
  
  // Manejo de selección de características
  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setSelectedFeatures(prev => [...prev, feature]);
    } else {
      setSelectedFeatures(prev => prev.filter(f => f !== feature));
    }
  };
  
  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 p-5 rounded-lg shadow-sm">
      <div>
        <h3 className="font-medium mb-4">Filtros de búsqueda</h3>
        <Button variant="outline" size="sm" className="w-full" onClick={clearFilters}>
          Limpiar filtros
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["precio", "tipo", "operacion", "superficie", "caracteristicas"]}>
        <AccordionItem value="precio">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider 
                value={priceRange} 
                min={0} 
                max={10000000} 
                step={100000} 
                onValueChange={setPriceRange} 
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
                <span>-</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tipo">
          <AccordionTrigger>Tipo de propiedad</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "casa", label: "Casa" },
                { id: "departamento", label: "Departamento" },
                { id: "terreno", label: "Terreno" },
                { id: "oficina", label: "Oficina" },
                { id: "local", label: "Local comercial" }
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`type-${id}`} 
                    checked={selectedTypes.includes(id)}
                    onCheckedChange={(checked) => 
                      handleTypeChange(id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`type-${id}`}>{label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="operacion">
          <AccordionTrigger>Operación</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[
                { id: "venta", label: "Venta" },
                { id: "alquiler", label: "Alquiler" },
                { id: "alquiler_temporal", label: "Alquiler temporal" }
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`op-${id}`} 
                    checked={selectedOperations.includes(id)}
                    onCheckedChange={(checked) => 
                      handleOperationChange(id, checked as boolean)
                    }
                  />
                  <Label htmlFor={`op-${id}`}>{label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="superficie">
          <AccordionTrigger>Superficie</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider 
                value={areaRange} 
                min={0} 
                max={1000} 
                step={10} 
                onValueChange={setAreaRange} 
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={areaRange[0]}
                  onChange={(e) => setAreaRange([Number(e.target.value), areaRange[1]])}
                />
                <span>-</span>
                <Input
                  type="number"
                  value={areaRange[1]}
                  onChange={(e) => setAreaRange([areaRange[0], Number(e.target.value)])}
                />
                <span>m²</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="caracteristicas">
          <AccordionTrigger>Características</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {availableFeatures.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`feature-${feature}`} 
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={(checked) => 
                      handleFeatureChange(feature, checked as boolean)
                    }
                  />
                  <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full" onClick={applyFilters}>Aplicar filtros</Button>
    </div>
  )
}

export function PropertyFilters() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertyFiltersContent />
    </Suspense>
  )
}
