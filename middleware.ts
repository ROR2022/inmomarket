import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "@/utils/supabase/server";
import { isUserAdmin } from "./utils/admin-auth";

export async function middleware(request: NextRequest) {
  // Primero actualizamos la sesión
  const response = await updateSession(request);
  
  // Verificar si la ruta comienza con /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    // Si no hay sesión, redirigir a inicio de sesión
    if (!user) {
      const redirectUrl = new URL('/sign-in', request.url);
      redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
    
    // Verificar si el usuario es admin
    const isAdmin = await isUserAdmin(user.id);
    
    // Si no es admin, redirigir a dashboard
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
