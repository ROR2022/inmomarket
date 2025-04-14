   CREATE TABLE IF NOT EXISTS public.property_details (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     property_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
     details JSONB NOT NULL DEFAULT '{}',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
   );

   -- Políticas RLS para property_details
   ALTER TABLE public.property_details ENABLE ROW LEVEL SECURITY;
   
   -- Política para lectura pública de detalles de propiedades activas
   CREATE POLICY "Property details are viewable by everyone" 
     ON public.property_details FOR SELECT 
     USING (
       EXISTS (
         SELECT 1 FROM public.properties 
         WHERE id = property_id AND status = 'active'
       )
     );
   
   -- Política para actualización de detalles (solo el autor de la propiedad)
   CREATE POLICY "Users can update details of their own properties" 
     ON public.property_details FOR ALL 
     USING (
       EXISTS (
         SELECT 1 FROM public.properties 
         WHERE id = property_id AND author_id = auth.uid()
       )
     );