-- Crear la tabla para almacenar los mensajes de contacto
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Agregar un índice para búsquedas por fecha
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at);

-- Configurar políticas de seguridad (RLS)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Política que permite a cualquiera insertar un mensaje
CREATE POLICY "Permite insertar mensajes a cualquiera" 
ON contact_messages FOR INSERT 
TO authenticated, anon
WITH CHECK (true);

-- Política que permite solo a administradores ver los mensajes
CREATE POLICY "Solo administradores ven mensajes" 
ON contact_messages FOR SELECT 
TO authenticated
USING (auth.role() = 'service_role');