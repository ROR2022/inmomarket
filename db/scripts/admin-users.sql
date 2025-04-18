-- Crear la tabla admin_users
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT,
  is_admin BOOLEAN NOT NULL DEFAULT true,
  admin_level TEXT DEFAULT 'basic' CHECK (admin_level IN ('basic', 'super', 'owner')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Crear índice para búsquedas por user_id
CREATE INDEX idx_admin_users_user_id ON public.admin_users(user_id);

-- Habilitar Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Política para lectura: Todos los usuarios autenticados pueden ver admins
-- (útil para verificar quién es admin cuando se necesite)
CREATE POLICY "Users can view admin list" ON public.admin_users
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Política para insertar/actualizar: Solo owners pueden modificar la tabla
CREATE POLICY "Only owners can insert admin users" ON public.admin_users
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.admin_users WHERE admin_level = 'owner'
    )
  );

CREATE POLICY "Only owners can update admin users" ON public.admin_users
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM public.admin_users WHERE admin_level = 'owner'
    )
  );

-- Política para eliminación: Solo owners pueden eliminar admins
CREATE POLICY "Only owners can delete admin users" ON public.admin_users
  FOR DELETE USING (
    auth.uid() IN (
      SELECT user_id FROM public.admin_users WHERE admin_level = 'owner'
    )
  );

-- Insertar el primer usuario admin (owner)
-- IMPORTANTE: Reemplaza 'TU_USER_ID' con el UUID de tu usuario en Supabase
INSERT INTO public.admin_users (user_id, username, is_admin, admin_level)
VALUES ('TU_USER_ID', 'Administrador Principal', true, 'owner');