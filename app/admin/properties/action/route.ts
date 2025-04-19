import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { isUserAdmin } from '@/utils/admin-auth';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Obtener parámetros de la URL
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    const action = url.searchParams.get('action');
    
    // Verificar que los parámetros sean válidos
    if (!id || !['enable', 'disable'].includes(action || '')) {
      return NextResponse.json(
        { error: 'Parámetros inválidos' },
        { status: 400 }
      );
    }
    
    // Verificar autenticación y permisos de administrador
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }
    
    const { isAdmin, adminLevel, error: adminError } = await isUserAdmin(user.id);
    
    if (!isAdmin || adminError) {
      return NextResponse.json(
        { error: 'No tienes permisos de administrador' },
        { status: 403 }
      );
    }
    
    // Actualizar estado de la propiedad
    const is_active = action === 'enable';
    
    const { error: updateError } = await supabase
      .from('properties')
      .update({ 
        is_active,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);
    
    if (updateError) {
      console.error('Error al actualizar propiedad:', updateError);
      return NextResponse.json(
        { error: 'Error al actualizar la propiedad' },
        { status: 500 }
      );
    }
    
    // Revalidar rutas para actualizar la UI
    revalidatePath('/admin/properties');
    revalidatePath(`/propiedad/${id}`);
    
    // Redirigir de vuelta a la página de propiedades
    return NextResponse.redirect(new URL('/admin/properties', request.url));
  } catch (error) {
    console.error('Error en acción de administrador:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 