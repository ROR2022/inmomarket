import { NextResponse } from 'next/server';
//import { createClient } from '@/utils/supabase/server';
import { updateDeposit } from '@/services/deposit';

export async function POST(request: Request) {
    try {
        
        const { paymentId, preferenceId } = await request.json();

        const updatedDeposit = await updateDeposit(paymentId, preferenceId, 'completed');
        
        if (updatedDeposit) {
            return NextResponse.json({ updatedDeposit }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Error updating deposit' }, { status: 500 });
        }
        
    } catch (error) {
        console.error('Error updating deposit:', error);
        return NextResponse.json({ error: 'Error updating deposit' }, { status: 500 });
    }
}