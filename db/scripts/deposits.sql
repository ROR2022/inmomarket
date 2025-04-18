-- Crear la tabla deposits
CREATE TABLE public.deposits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID NOT NULL REFERENCES public.properties(id) ON DELETE CASCADE,
  listing_title TEXT NOT NULL,
  buyer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  buyer_email TEXT NOT NULL,
  deposit_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'canceled', 'refunded')),
  preference_id TEXT,
  payment_id TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Crear índices para búsquedas frecuentes
CREATE INDEX idx_deposits_buyer_id ON public.deposits(buyer_id);
CREATE INDEX idx_deposits_listing_id ON public.deposits(listing_id);
CREATE INDEX idx_deposits_status ON public.deposits(status);
CREATE INDEX idx_deposits_created_at ON public.deposits(created_at);

-- Habilitar Row Level Security
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;

-- Política para inserción: Solo usuarios autenticados pueden crear depósitos
CREATE POLICY "Users can create deposits" ON public.deposits
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Política para lectura: Los usuarios pueden ver solo sus propios depósitos
CREATE POLICY "Users can view own deposits" ON public.deposits
  FOR SELECT USING (auth.uid() = buyer_id);

-- Política para lectura: Los administradores pueden ver todos los depósitos
CREATE POLICY "Admins can view all deposits" ON public.deposits
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM public.admin_users WHERE is_admin = true
    )
  );

-- Política para actualización: Solo administradores o servicio de webhook pueden actualizar depósitos
-- Esta política es más permisiva para permitir webhooks de actualización de pagos
CREATE POLICY "Admins can update deposits" ON public.deposits
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM public.admin_users WHERE is_admin = true
    )
  );