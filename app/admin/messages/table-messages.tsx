import React from 'react';
import { Message } from './page';
import { Button } from '@/components/ui/button';
//import { Badge } from '@/components/ui/badge';
import { Eye, Trash } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

const TableMessages = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remitente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Asunto
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mensaje
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Teléfono
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No hay mensajes disponibles
                </td>
              </tr>
            ) : (
              messages.map((message) => (
                <tr key={message.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium text-sm">
                          {message.name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {message.name || 'Usuario'}
                        </div>
                        <div className="text-xs text-gray-500">
                          {message.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-medium">
                      {message.subject}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 truncate max-w-xs">
                      {message.message}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {message.phone || 'No disponible'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span>{new Date(message.created_at).toLocaleDateString('es-MX')}</span>
                      <span className="text-xs">
                        {formatDistanceToNow(new Date(message.created_at), { 
                          addSuffix: true,
                          locale: es
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link href={`/admin/messages/${message.id}`}>
                        <Button variant="outline" size="sm" className="px-2" title="Ver detalle">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form action={`/admin/messages/action?id=${message.id}&action=delete`} method="POST">
                        <Button 
                          type="submit"
                          variant="destructive"
                          size="sm"
                          className="px-2"
                          title="Eliminar mensaje"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableMessages;