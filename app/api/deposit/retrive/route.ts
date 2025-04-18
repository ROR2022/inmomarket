//esta ruta se encarga de obtener el depósito por el listingId
import { NextRequest, NextResponse } from 'next/server';
import { getDepositByPreferenceId } from '@/services/deposit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const preferenceId = searchParams.get('preferenceId');
  if (!preferenceId) {
    return NextResponse.json({ error: 'preferenceId is required' }, { status: 400 });
  }
  try {
    const deposit = await getDepositByPreferenceId(preferenceId);
    return NextResponse.json(deposit, { status: 200 });
  } catch (error) {
    console.error('Error al obtener el depósito:', error);
    return NextResponse.json({ error: 'Error al obtener el depósito' }, { status: 500 });
  }
}
