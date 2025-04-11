"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PropertySorter() {
  return (
    <Select defaultValue="relevancia">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="relevancia">Relevancia</SelectItem>
        <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
        <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
        <SelectItem value="fecha-desc">Más recientes</SelectItem>
        <SelectItem value="superficie-asc">Superficie: menor a mayor</SelectItem>
        <SelectItem value="superficie-desc">Superficie: mayor a menor</SelectItem>
      </SelectContent>
    </Select>
  )
}
