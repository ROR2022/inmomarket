   CREATE TABLE IF NOT EXISTS public.properties (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     title TEXT NOT NULL,
     description TEXT NOT NULL,
     price DECIMAL NOT NULL,
     currency TEXT NOT NULL DEFAULT 'MXN',
     location TEXT NOT NULL,
     type TEXT NOT NULL CHECK (type IN ('casa', 'departamento', 'terreno', 'oficina', 'local')),
     status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold', 'rented', 'pending')),
     author_id UUID NOT NULL REFERENCES public.profiles(id),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );

   -- Políticas RLS para properties
   ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
   
   -- Política para lectura pública de propiedades activas
   CREATE POLICY "Active properties are viewable by everyone" 
     ON public.properties FOR SELECT 
     USING (status = 'active');
   
   -- Política para creación de propiedades (solo vendedores y agentes)
   CREATE POLICY "Sellers and agents can create properties" 
     ON public.properties FOR INSERT 
     WITH CHECK (
       EXISTS (
         SELECT 1 FROM public.profiles 
         WHERE id = auth.uid() AND role IN ('seller', 'agent')
       )
     );
   
   -- Política para actualización de propiedades (solo el autor)
   CREATE POLICY "Users can update their own properties" 
     ON public.properties FOR UPDATE 
     USING (author_id = auth.uid());
   
   -- Política para eliminación de propiedades (solo el autor)
   CREATE POLICY "Users can delete their own properties" 
     ON public.properties FOR DELETE 
     USING (author_id = auth.uid());