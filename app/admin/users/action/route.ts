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
    if (!id || !['make-admin', 'remove-admin'].includes(action || '')) {
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
    
    // Solo los superadministradores (owner) pueden gestionar otros administradores
    if (!isAdmin || adminLevel !== 'owner' || adminError) {
      return NextResponse.json(
        { error: 'No tienes permisos suficientes para esta acción' },
        { status: 403 }
      );
    }
    
    // Obtener información del usuario objetivo
    const { data: targetUser, error: userError } = await supabase
      .from('profiles')
      .select('id, email, username, full_name')
      .eq('id', id)
      .single();
    
    if (userError || !targetUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    if (action === 'make-admin') {
      // Verificar si ya es admin
      const { data: existingAdmin } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', id)
        .single();
      
      if (existingAdmin) {
        return NextResponse.json(
          { error: 'El usuario ya es administrador' },
          { status: 400 }
        );
      }
      
      // Hacer al usuario admin con nivel basic
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert({
          user_id: id,
          username: targetUser.username || targetUser.full_name || 'Admin',
          is_admin: true,
          admin_level: 'basic'
        });
      
      if (insertError) {
        console.error('Error al crear administrador:', insertError);
        return NextResponse.json(
          { error: 'Error al crear el administrador' },
          { status: 500 }
        );
      }
    } else if (action === 'remove-admin') {
      // No permitir eliminar el propio rol de administrador
      if (id === user.id) {
        return NextResponse.json(
          { error: 'No puedes eliminar tu propio rol de administrador' },
          { status: 400 }
        );
      }
      
      // Verificar si es admin de nivel owner (no se puede eliminar)
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('admin_level')
        .eq('user_id', id)
        .single();
      
      if (adminData?.admin_level === 'owner') {
        return NextResponse.json(
          { error: 'No se puede eliminar un administrador principal (owner)' },
          { status: 400 }
        );
      }
      
      // Eliminar el rol de administrador
      const { error: deleteError } = await supabase
        .from('admin_users')
        .delete()
        .eq('user_id', id);
      
      if (deleteError) {
        console.error('Error al eliminar administrador:', deleteError);
        return NextResponse.json(
          { error: 'Error al eliminar el administrador' },
          { status: 500 }
        );
      }
    }
    
    // Revalidar rutas para actualizar la UI
    revalidatePath('/admin/users');
    
    // Redirigir de vuelta a la página de usuarios
    return NextResponse.redirect(new URL('/admin/users', request.url));
  } catch (error) {
    console.error('Error en acción de administrador:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 