import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Shield, Check, X, Eye, AlertTriangle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SelectUsers from './select-users';

export const metadata = {
  title: 'Gestión de Usuarios - InmoMarket',
  description: 'Panel de administración de usuarios de InmoMarket',
};

interface AdminUsersPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    role?: string;
  }>
}
async function getUsers(searchParams: AdminUsersPageProps['searchParams']) {
  const supabase = await createClient();
  const searchParamsAwaited = await searchParams;
  const page = parseInt(searchParamsAwaited.page || '1');
  const pageSize = parseInt(searchParamsAwaited.pageSize || '10');
  const role = searchParamsAwaited.role || 'all';
  
  try {
    // Primero obtenemos los perfiles con paginación y ordenamiento
    let profilesQuery = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);
    
    const { data: profiles, error: profilesError } = await profilesQuery;
    
    if (profilesError) throw profilesError;
    
    // Si no hay perfiles, devolver un resultado vacío
    if (!profiles || profiles.length === 0) {
      return {
        users: [],
        pagination: {
          total: 0,
          page,
          pageSize,
        }
      };
    }
    
    // Obtener IDs de usuarios para la consulta de admin_users
    const userIds = profiles.map(profile => profile.id);
    
    // Consultar la tabla admin_users para estos usuarios
    const { data: adminUsers, error: adminUsersError } = await supabase
      .from('admin_users')
      .select('*')
      .in('user_id', userIds);
      
    if (adminUsersError) throw adminUsersError;
    
    // Combinar los resultados
    const users = profiles.map(profile => {
      const adminUser = adminUsers?.find(admin => admin.user_id === profile.id);
      return {
        ...profile,
        admin_users: adminUser ? {
          is_admin: adminUser.is_admin,
          admin_level: adminUser.admin_level
        } : null
      };
    });
    
    // Filtrar por rol si es necesario
    let filteredUsers = users;
    if (role === 'admin') {
      filteredUsers = users.filter(user => user.admin_users !== null);
    } else if (role === 'user') {
      filteredUsers = users.filter(user => user.admin_users === null);
    }
    
    // Obtener el total de registros para la paginación
    // Esto es una simplificación, idealmente deberíamos contar el total con otro query
    const { count } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    
    return {
      users: filteredUsers,
      pagination: {
        total: count || filteredUsers.length,
        page,
        pageSize,
      }
    };
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    return {
      users: [],
      pagination: {
        total: 0,
        page,
        pageSize,
      }
    };
  }
}

export default async function AdminUsersPage({ searchParams }: AdminUsersPageProps) {
  const { users, pagination } = await getUsers(searchParams);
  
  const searchParamsAwaited = await searchParams;
  const currentPage = parseInt(searchParamsAwaited.page || '1');
  const pageSize = parseInt(searchParamsAwaited.pageSize || '10');
  const role = searchParamsAwaited.role || 'all';
  
  // Calcular páginas para paginación
  const totalPages = Math.ceil(pagination.total / pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
        <SelectUsers role={role}/>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registro
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.username || (user.full_name || 'Usuario sin nombre')}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {user.id.substring(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.email}
                      {user.email_confirmed ? (
                        <span className="ml-2 text-xs text-green-500">
                          <Check className="inline h-3 w-3" />
                        </span>
                      ) : (
                        <span className="ml-2 text-xs text-red-500">
                          <AlertTriangle className="inline h-3 w-3" />
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.admin_users?.is_admin ? (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                        Admin ({user.admin_users?.admin_level})
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-100">
                        Usuario
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString('es-MX')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link href={`/admin/users/${user.id}`}>
                        <Button variant="outline" size="sm" className="px-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      {user.admin_users?.is_admin ? (
                        <form action={`/admin/users/action?id=${user.id}&action=remove-admin`} method="POST">
                          <Button 
                            type="submit"
                            variant="destructive"
                            size="sm"
                            className="px-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </form>
                      ) : (
                        <form action={`/admin/users/action?id=${user.id}&action=make-admin`} method="POST">
                          <Button 
                            type="submit"
                            variant="outline"
                            size="sm"
                            className="px-2"
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                        </form>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> a{' '}
                <span className="font-medium">
                  {Math.min(currentPage * pageSize, pagination.total)}
                </span>{' '}
                de <span className="font-medium">{pagination.total}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Link
                  href={{
                    pathname: '/admin/users',
                    query: {
                      ...searchParamsAwaited,
                      page: Math.max(currentPage - 1, 1),
                    },
                  }}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                    currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="sr-only">Anterior</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
                
                {pages.map((page) => (
                  <Link
                    key={page}
                    href={{
                      pathname: '/admin/users',
                      query: {
                        ...searchParamsAwaited,
                        page,
                      },
                    }}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                      page === currentPage
                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
                
                <Link
                  href={{
                    pathname: '/admin/users',
                    query: {
                      ...searchParamsAwaited,
                      page: Math.min(currentPage + 1, totalPages),
                    },
                  }}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                    currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <span className="sr-only">Siguiente</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 