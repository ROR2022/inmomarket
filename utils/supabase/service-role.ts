// este archivo se encarga de crear un cliente de supabase con el rol de servicio
//SUPABASE_SERVICE_ROLE_KEY

import { createClient } from '@supabase/supabase-js';

export const supabaseServiceRole = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);


