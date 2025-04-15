import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, LogOut, MessageSquare, Settings, User } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/server"

export async function UserNav() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  //console.log('user-nav dataUser: ', user)
  //determinar el name del usuario solo la primera palabra
  const userName = user?.user_metadata?.name?.split(' ')[0]
  //o sacarlo de full_name
  const fullName = user?.user_metadata?.full_name?.split(' ')[0]
  //o sacarlo de email
  const emailName = user?.email?.split('@')[0]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata.avatar_url || "/placeholder.svg"} alt="Usuario" />
            <AvatarFallback>{userName || fullName || emailName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName || fullName || emailName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>   
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer w-full flex">
              <User className="mr-2 h-4 w-4" />
              <span>Panel de control</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem asChild>
            <Link href="/dashboard?tab=mensajes" className="cursor-pointer w-full flex">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Mensajes</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/notificaciones" className="cursor-pointer w-full flex">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notificaciones</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/perfil/configuracion" className="cursor-pointer w-full flex">
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </Link>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/**Este deberia ser un link que envie a la pagina de logout */}
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/logout" className="cursor-pointer w-full flex">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar sesión</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
