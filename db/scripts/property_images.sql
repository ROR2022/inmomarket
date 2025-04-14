   CREATE TABLE IF NOT EXISTS public.property_images (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
     image_url TEXT NOT NULL,
     storage_path TEXT NOT NULL,
     is_primary BOOLEAN DEFAULT false,
     order_index INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );

   -- Políticas RLS para property_images
   ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
   
   -- Política para lectura pública de imágenes de propiedades activas
   CREATE POLICY "Property images are viewable by everyone" 
     ON public.property_images FOR SELECT 
     USING (
       EXISTS (
         SELECT 1 FROM public.properties 
         WHERE id = property_id AND status = 'active'
       )
     );
   
   -- Política para gestión de imágenes (solo el autor de la propiedad)
   CREATE POLICY "Users can manage images of their own properties" 
     ON public.property_images FOR ALL 
     USING (
       EXISTS (
         SELECT 1 FROM public.properties 
         WHERE id = property_id AND author_id = auth.uid()
       )
     );