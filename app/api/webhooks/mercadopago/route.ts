import { NextResponse, type NextRequest } from "next/server";
//import { createClient } from "@/utils/supabase/server"
import { getPaymentById } from "@/services/mercado-pago";
//import { Deposit } from "@/services/deposit";



export async function POST(request: NextRequest) {
  try {
    // Verificar la firma del webhook (no implementado para desarrollo)
    // TODO: Para producción, verificar la firma del webhook
    
    const payload = await request.json();
    console.log('Received webhook payload:', JSON.stringify(payload));
    
    // Solo procesar notificaciones de pagos
    if (payload.action === 'payment.created' || payload.action === 'payment.updated') {
      const paymentId = payload.data.id;
      const paymentData = await getPaymentById(paymentId);
      
      console.warn("webhook, paymentData: ", paymentData);
      if (paymentData) {
        //await processPayment(paymentData as unknown as MercadoPagoPayment);
        console.warn("processing payment... ");
      } else {
        console.error('Failed to fetch payment data for ID:', paymentId);
      }
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

