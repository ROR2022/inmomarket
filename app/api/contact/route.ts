import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const data = await request.json();
    
    // Validación básica
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    // Preparar los datos para insertar
    const contactData = {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject,
      message: data.message,
      created_at: new Date().toISOString(),
    };

    // Insertar en Supabase
    const { error } = await supabase
      .from('contact_messages')
      .insert([contactData]);

    if (error) {
      console.error('Error al guardar en Supabase:', error);
      return NextResponse.json(
        { error: 'Error al guardar el mensaje' },
        { status: 500 }
      );
    }

    // Respuesta exitosa
    return NextResponse.json(
      { message: 'Mensaje recibido correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error en la API de contacto:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
} 