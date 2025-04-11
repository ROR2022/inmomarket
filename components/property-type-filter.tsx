"use client"

import { Building, Building2, Home, MapPin, Store, Warehouse } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type PropertyType = "casa" | "departamento" | "terreno" | "oficina" | "local" | "todos"

export function PropertyTypeFilter() {
  const [selectedType, setSelectedType] = useState<PropertyType>("todos")

  const propertyTypes = [
    { id: "todos", label: "Todos", icon: MapPin },
    { id: "casa", label: "Casas", icon: Home },
    { id: "departamento", label: "Departamentos", icon: Building },
    { id: "terreno", label: "Terrenos", icon: Warehouse },
    { id: "oficina", label: "Oficinas", icon: Building2 },
    { id: "local", label: "Locales", icon: Store },
  ]

  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
      {propertyTypes.map((type) => {
        const Icon = type.icon
        return (
          <Button
            key={type.id}
            variant={selectedType === type.id ? "default" : "outline"}
            className="flex flex-col h-auto py-3 px-4"
            onClick={() => setSelectedType(type.id as PropertyType)}
          >
            <Icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{type.label}</span>
          </Button>
        )
      })}
    </div>
  )
}
