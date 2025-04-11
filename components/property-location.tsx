export function PropertyLocation() {
  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">Colonia Roma, Ciudad de México, México</p>

      <div className="aspect-[16/9] bg-muted rounded-md flex items-center justify-center">
        <p className="text-muted-foreground">Mapa de ubicación</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Lugares cercanos:</h4>
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li>Parque México (500m)</li>
          <li>Supermercado (300m)</li>
          <li>Estación de metro (800m)</li>
          <li>Escuela primaria (1km)</li>
          <li>Centro comercial (1.5km)</li>
        </ul>
      </div>
    </div>
  )
}
