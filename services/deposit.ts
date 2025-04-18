import { createClient } from '@/utils/supabase/server';

export interface Deposit {
  id: string;
  listing_id: string;
  listing_title: string;
  buyer_email: string;
  buyer_id: string;
  deposit_amount: number;
  status: string;
  preference_id: string;
  payment_id: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
}

export async function createDeposit(
  listingId: string,
  listingTitle: string,
  buyerEmail: string,
  buyerId: string,
  depositAmount: number,
  preferenceId: string,
  paymentId: string,
  expiresAt: string,
  createdAt: string,
  updatedAt: string
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    const { data, error } = await supabase.from('deposits').insert({
      listing_id: listingId,
      listing_title: listingTitle,
      buyer_email: buyerEmail,
      buyer_id: buyerId,
      deposit_amount: depositAmount,
      status: 'pending',
      preference_id: preferenceId,
      payment_id: paymentId,
      expires_at: expiresAt,
      created_at: createdAt,
      updated_at: updatedAt,
    });
    if (error) {
      throw new Error('Error al crear el depósito');
    }
    return data as unknown as Deposit;
  } catch (error) {
    console.error('Error al crear el depósito:', error);
    throw error;
  }
}

export async function updateDeposit(paymentId: string, preferenceId: string, status: string) {
  try {
    console.log('services/deposit.ts updateDeposit paymentId: ', paymentId);
    console.log('services/deposit.ts updateDeposit preferenceId: ', preferenceId);
    console.log('services/deposit.ts updateDeposit status: ', status);
    const supabase = await createClient();
    //verificar si el usuario esta autenticado
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    console.log('services/deposit.ts updateDeposit user: ', user);
    const { data, error } = await supabase
      .from('deposits')
      .update({ payment_id: paymentId, status: status })
      .eq('preference_id', preferenceId)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar el depósito:', error);
      throw new Error('Error al actualizar el depósito', error);
    }
    console.log('services/deposit.ts updateDeposit data: ', data);
    return data as unknown as Deposit;
  } catch (error) {
    console.error('Error al actualizar el depósito:', error);
    throw error;
  }
}

export async function getDepositByListingId(listingId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('deposits')
      .select('*')
      .eq('listing_id', listingId)
      .single();
    if (error) {
      throw new Error('Error al obtener el depósito');
    }
    return data as unknown as Deposit;
  } catch (error) {
    console.error('Error al obtener el depósito:', error);
    throw error;
  }
}

export async function getDepositByPreferenceId(preferenceId: string) {
  try {
    console.log('services/deposit.ts getDepositByPreferenceId preferenceId: ', preferenceId);
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('deposits')
      .select('*')
      .eq('preference_id', preferenceId)
      .single();    

    if (error) {    
      console.error('Error al obtener el depósito:', error);
      throw new Error('Error al obtener el depósito');
    }
    console.log('services/deposit.ts getDepositByPreferenceId data: ', data);
    return data as unknown as Deposit;
  } catch (error) {
    console.error('Error al obtener el depósito:', error);
    throw error;
  }
}

export async function getDepositsByUserId(userId: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('deposits')
      .select('*')
      .eq('buyer_id', userId);  
    if (error) {
      throw new Error('Error al obtener los depósitos');
    }
    return data as unknown as Deposit[];
  } catch (error) {
    console.error('Error al obtener los depósitos:', error);
  }
}
