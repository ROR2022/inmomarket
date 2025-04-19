import React from 'react'
import TableMessages from './table-messages'
import { supabaseServiceRole } from '@/utils/supabase/service-role';



export interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
    phone: string;
    subject: string;
}
const AdminMessagesPage = async () => {
    let messages: Message[] = [];
    try {
        const { data, error } = await supabaseServiceRole
        .from('contact_messages')   
        .select('*')
        .order('created_at', { ascending: false });

        if (error) {
            console.error('Error al obtener los mensajes:', error);
        }

        messages = data || [];

        //console.log('messages...', messages);
        
    } catch (error) {
        console.error('Error al obtener los mensajes:', error);
    }
  return (
    <div>
        {messages.length > 0 ? (
            <TableMessages messages={messages} />
        ) : (
            <div>No hay mensajes</div>
        )}
    </div>
  )
}

export default AdminMessagesPage;