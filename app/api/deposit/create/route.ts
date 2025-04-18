import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createReservationPaymentPreference } from '@/services/mercado-pago';
import { createDeposit, Deposit } from '@/services/deposit';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    //primero se verifica si el usuario esta autenticado
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Usuario no autenticado' }, { status: 401 });
    }
    //del body se obtiene el id de la propiedad y el monto del depósito
    const { listingId, listingTitle, depositAmount } = await request.json();

    const buyerEmail = user?.email || '';
    //se crea la preferencia de pago
    const preference = await createReservationPaymentPreference(
      listingId,
      listingTitle,
      buyerEmail,
      depositAmount
    );

    //se crea el depósito con status pendiente
    const deposit: Deposit = await createDeposit(
      listingId,
      listingTitle,
      buyerEmail,
      user.id,
      depositAmount,
      preference.id as string,
      "pendingId",
      preference.expiration_date_to as string,
      new Date().toISOString(),
      new Date().toISOString()
    );
    //se retorna la url de la preferencia de pago y el id del depósito
    console.log('deposit/create/route.ts  preference: ', preference);
    console.log('deposit/create/route.ts  deposit: ', deposit);
    return NextResponse.json({
      preferenceUrl: preference.init_point,
    });
  } catch (error) {
    console.error('Error al crear el depósito:', error);
    return NextResponse.json({ error: 'Error al crear el depósito' }, { status: 500 });
  }
}
