//esta ruta se encarga de obtener todos los depósitos de un usuario
import { NextResponse } from 'next/server';
import { getDepositsByUserId } from '@/services/deposit';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  console.log('app/api/deposit/get-all/route.ts GET iniciando...');
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
  }
  const userId = user.id;
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }
  try {
    const deposits = await getDepositsByUserId(userId);
    return NextResponse.json(deposits, { status: 200 });
  } catch (error) {
    console.error('Error al obtener los depósitos:', error);
    return NextResponse.json({ error: 'Error al obtener los depósitos' }, { status: 500 });
  }
}
