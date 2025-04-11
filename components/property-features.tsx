import { Bath, BedDouble, Car, Maximize, Ruler, Wifi } from "lucide-react"

export function PropertyFeatures() {
  const features = [
    { icon: BedDouble, label: "3 Habitaciones" },
    { icon: Bath, label: "2 Baños" },
    { icon: Car, label: "1 Garaje" },
    { icon: Maximize, label: "150 m² construidos" },
    { icon: Ruler, label: "200 m² de terreno" },
    { icon: Wifi, label: "Internet de alta velocidad" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((feature, index) => {
        const Icon = feature.icon
        return (
          <div key={index} className="flex items-center gap-2">
            <div className="bg-muted p-2 rounded-md">
              <Icon className="h-5 w-5" />
            </div>
            <span>{feature.label}</span>
          </div>
        )
      })}
    </div>
  )
}
