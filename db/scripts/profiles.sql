-- Crear tabla de perfiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'seller', 'agent', 'admin')),
  bio TEXT,
  phone TEXT,
  website TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Crear política para acceso público a perfiles (solo lectura)
CREATE POLICY "Perfiles visibles públicamente" 
ON profiles FOR SELECT USING (true);

-- Política para que usuarios solo puedan editar su propio perfil
CREATE POLICY "Los usuarios pueden editar su propio perfil" 
ON profiles FOR UPDATE USING (auth.uid() = id);

-- Política para que solo administradores puedan cambiar roles
CREATE POLICY "Solo administradores pueden cambiar roles" 
ON profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (
  (auth.role() = 'service_role') OR 
  (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() AND profiles.role = role
  ))
);

-- Trigger para crear perfil al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, role)
  VALUES (new.id, new.email, 'buyer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();



     -- Asumiendo que el script profiles.sql ya existe pero necesita ser completado
   CREATE TABLE IF NOT EXISTS public.profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     full_name TEXT,
     avatar_url TEXT,
     role TEXT NOT NULL CHECK (role IN ('buyer', 'seller', 'agent', 'admin')),
     bio TEXT,
     website TEXT,
     phone TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );

   -- Políticas RLS para profiles
   ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
   
   -- Política para lectura pública de perfiles
   CREATE POLICY "Profiles are viewable by everyone" 
     ON public.profiles FOR SELECT USING (true);
   
   -- Política para que los usuarios puedan editar sus propios perfiles
   CREATE POLICY "Users can update their own profiles" 
     ON public.profiles FOR UPDATE 
     USING (auth.uid() = id);





    -- Add username column to profiles if it doesn't exist
DO $outer$
BEGIN
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'username'
    ) THEN
        ALTER TABLE profiles ADD COLUMN username TEXT UNIQUE;
        
        -- Update existing rows to set username equal to email
        UPDATE profiles SET username = email WHERE username IS NULL;
    END IF;
END
$outer$;

-- Update the trigger function to handle both email and username
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, role)
  VALUES (new.id, new.email, new.email, 'buyer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;