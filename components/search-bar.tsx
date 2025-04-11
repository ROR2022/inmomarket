"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyType, setPropertyType] = useState("")
  const [operation, setOperation] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the search logic
    console.log({ searchTerm, propertyType, operation })
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
          <SelectItem value="venta">Venta</SelectItem>
          <SelectItem value="alquiler">Alquiler</SelectItem>
          <SelectItem value="temporal">Alquiler temporal</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit">Buscar</Button>
    </form>
  )
}
