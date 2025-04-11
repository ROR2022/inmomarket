import { Button } from "@/components/ui/button"
import { Calendar, Heart, Share2 } from "lucide-react"
import Link from "next/link"

export function PropertyActions() {
  return (
    <div className="flex flex-wrap gap-3 mt-8">
      <Button asChild>
        <Link href="/contacto/1">Contactar</Link>
      </Button>

      <Button variant="outline" asChild>
        <Link href="/agendar/1">
          <Calendar className="mr-2 h-4 w-4" />
          Agendar visita
        </Link>
      </Button>

      <Button variant="outline">
        <Heart className="mr-2 h-4 w-4" />
        Guardar
      </Button>

      <Button variant="outline">
        <Share2 className="mr-2 h-4 w-4" />
        Compartir
      </Button>
    </div>
  )
}
