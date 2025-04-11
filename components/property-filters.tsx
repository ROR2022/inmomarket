"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

export function PropertyFilters() {
  const [priceRange, setPriceRange] = useState([500000, 5000000])
  const [areaRange, setAreaRange] = useState([50, 500])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">Filtros</h3>
        <Button variant="outline" size="sm" className="w-full">
          Limpiar filtros
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={["precio", "tipo", "caracteristicas"]}>
        <AccordionItem value="precio">
          <AccordionTrigger>Precio</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={priceRange} min={0} max={10000000} step={100000} onValueChange={setPriceRange} />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                />
                <span>-</span>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tipo">
          <AccordionTrigger>Tipo de propiedad</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Casa", "Departamento", "Terreno", "Oficina", "Local comercial"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type}`} />
                  <Label htmlFor={`type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="operacion">
          <AccordionTrigger>Operación</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {["Venta", "Alquiler", "Alquiler temporal"].map((op) => (
                <div key={op} className="flex items-center space-x-2">
                  <Checkbox id={`op-${op}`} />
                  <Label htmlFor={`op-${op}`}>{op}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="superficie">
          <AccordionTrigger>Superficie</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider value={areaRange} min={0} max={1000} step={10} onValueChange={setAreaRange} />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={areaRange[0]}
                  onChange={(e) => setAreaRange([Number.parseInt(e.target.value), areaRange[1]])}
                />
                <span>-</span>
                <Input
                  type="number"
                  value={areaRange[1]}
                  onChange={(e) => setAreaRange([areaRange[0], Number.parseInt(e.target.value)])}
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
              {[
                "Piscina",
                "Jardín",
                "Garaje",
                "Seguridad 24h",
                "Amueblado",
                "Aire acondicionado",
                "Calefacción",
                "Terraza",
                "Ascensor",
              ].map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox id={`feature-${feature}`} />
                  <Label htmlFor={`feature-${feature}`}>{feature}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button className="w-full">Aplicar filtros</Button>
    </div>
  )
}
