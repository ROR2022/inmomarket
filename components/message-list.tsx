import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

export function MessageList() {
  // This would be replaced with actual data fetching
  const messages = [
    {
      id: "1",
      sender: {
        name: "Juan Pérez",
        avatar: "/placeholder.svg",
      },
      property: {
        id: "1",
        title: "Casa moderna con jardín",
      },
      content: "Hola, estoy interesado en esta propiedad. ¿Podría agendar una visita para el próximo fin de semana?",
      date: new Date(2023, 3, 15),
      read: false,
    },
    {
      id: "2",
      sender: {
        name: "María López",
        avatar: "/placeholder.svg",
      },
      property: {
        id: "2",
        title: "Departamento céntrico",
      },
      content:
        "Buenos días, ¿el precio es negociable? Me interesa mucho la propiedad pero mi presupuesto es un poco menor.",
      date: new Date(2023, 3, 14),
      read: true,
    },
    {
      id: "3",
      sender: {
        name: "Carlos Rodríguez",
        avatar: "/placeholder.svg",
      },
      property: {
        id: "3",
        title: "Oficina en zona financiera",
      },
      content: "¿La oficina incluye servicios como internet y limpieza? Gracias por la información.",
      date: new Date(2023, 3, 12),
      read: true,
    },
  ]

  return (
    <div className="space-y-4">
      {messages.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">No tienes mensajes</p>
          </CardContent>
        </Card>
      ) : (
        messages.map((message) => (
          <Card key={message.id} className={message.read ? "" : "border-primary"}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{message.sender.name}</CardTitle>
                    <p className="text-xs text-muted-foreground">
                      Sobre:{" "}
                      <a href={`/propiedades/${message.property.id}`} className="hover:underline">
                        {message.property.title}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(message.date, { addSuffix: true, locale: es })}
                  </p>
                  {!message.read && <Badge>Nuevo</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{message.content}</p>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex gap-2">
                <Button size="sm">Responder</Button>
                <Button size="sm" variant="outline">
                  Marcar como {message.read ? "no leído" : "leído"}
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}
