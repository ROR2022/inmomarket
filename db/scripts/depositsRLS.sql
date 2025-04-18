-- 1. Ver la estructura y columnas de la tabla deposits
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM 
  information_schema.columns
WHERE 
  table_name = 'deposits'
AND 
  table_schema = 'public'
ORDER BY 
  ordinal_position;

-- 2. Ver las políticas RLS aplicadas a la tabla deposits
SELECT 
  p.policyname AS policy_name,
  p.tablename AS table_name,
  p.cmd AS operation,
  p.permissive,
  p.roles,
  pg_get_expr(p.qual, p.tableid) AS policy_definition,
  p.with_check AS check_expression
FROM 
  pg_policies p
WHERE 
  p.tablename = 'deposits'
AND 
  p.schemaname = 'public';

-- 3. Verificar si RLS está habilitado
SELECT 
  relname AS table_name,
  relrowsecurity AS rls_enabled
FROM 
  pg_class
WHERE 
  relname = 'deposits'
AND 
  relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');

-- 4. Ver restricciones específicas de la tabla
SELECT 
  c.conname AS constraint_name,
  c.contype AS constraint_type,
  pg_get_constraintdef(c.oid) AS definition
FROM 
  pg_constraint c
JOIN 
  pg_class t ON c.conrelid = t.oid
WHERE 
  t.relname = 'deposits'
AND 
  t.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');

-- 5. Verificar permisos de la tabla
SELECT 
  grantee, 
  privilege_type 
FROM 
  information_schema.role_table_grants 
WHERE 
  table_name = 'deposits'
AND 
  table_schema = 'public';

-- 6. Ver triggers que podrían estar afectando la actualización
SELECT 
  trigger_name,
  event_manipulation,
  action_statement,
  action_timing
FROM 
  information_schema.triggers
WHERE 
  event_object_table = 'deposits'
AND 
  event_object_schema = 'public';

-- 7. Si queremos verificar un preference_id específico (descomenta y reemplaza)
-- SELECT * FROM deposits WHERE preference_id = 'TU_PREFERENCE_ID_AQUÍ';