import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function PropertyAgent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg" alt="Agente" />
          <AvatarFallback>AG</AvatarFallback>
        </Avatar>
        <div>
          <h4 className="font-medium">Carlos Rodríguez</h4>
          <p className="text-sm text-muted-foreground">Agente inmobiliario</p>
        </div>
      </div>

      <div className="text-sm space-y-1">
        <p>
          <span className="font-medium">Teléfono:</span> +52 55 1234 5678
        </p>
        <p>
          <span className="font-medium">Email:</span> carlos@inmomarket.com
        </p>
      </div>

      <Button variant="outline" className="w-full" asChild>
        <Link href="/agentes/1">Ver perfil completo</Link>
      </Button>
    </div>
  )
}
