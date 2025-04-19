import { createClient } from '@/utils/supabase/server';

export async function isUserAdmin(userId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .eq('is_admin', true)
      .single();
    
    if (error) {
      console.error('Error verificando estado de administrador:', error);
      return { isAdmin: false, adminLevel: null, error };
    }
    
    return { 
      isAdmin: !!data, 
      adminLevel: data?.admin_level || null, 
      error: null 
    };
  } catch (error) {
    console.error('Error en verificación de administrador:', error);
    return { isAdmin: false, adminLevel: null, error };
  }
} 