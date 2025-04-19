//import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Property } from '@/types/property';
import { getProperties } from '@/app/actionsProperties';
import SelectProperties from './select-properties';

export const metadata = {
  title: 'Administrar Propiedades - InmoMarket',
  description: 'Gestión y moderación de propiedades en InmoMarket',
};

interface AdminPropertiesPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    status?: string;
  }>;
}

async function getAdminProperties(searchParams: AdminPropertiesPageProps['searchParams']) {
  const searchParamsAwaited = await searchParams;
  const page = parseInt(searchParamsAwaited.page || '1');
  const pageSize = parseInt(searchParamsAwaited.pageSize || '10');
  const status = searchParamsAwaited.status || 'all';

  let statusFilter = {};
  if (status === 'active') {
    statusFilter = { is_active: true };
  } else if (status === 'inactive') {
    statusFilter = { is_active: false };
  }

  // Usar la función getProperties con filtros específicos para admin
  const result = await getProperties({
    page,
    pageSize,
    ...statusFilter,
  });

  return result;
}

export default async function AdminPropertiesPage({ searchParams }: AdminPropertiesPageProps) {
  const { properties, pagination } = await getAdminProperties(searchParams);

  const searchParamsAwaited = await searchParams;
  const currentPage = parseInt(searchParamsAwaited.page || '1');
  const pageSize = parseInt(searchParamsAwaited.pageSize || '10');
  const status = searchParamsAwaited.status || 'all';

  // Calcular páginas para paginación
  const totalPages = Math.ceil(pagination.totalItems / pageSize);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Propiedades</h1>
        <SelectProperties status={status} />
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Propiedad
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Propietario
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Precio
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {properties.map((property: Property) => (
                <tr key={property.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 relative">
                        {property.mainImageUrl ? (
                          <Image
                            src={property.mainImageUrl}
                            alt={property.title}
                            fill
                            sizes="40px"
                            className="object-cover rounded-md"
                          />
                        ) : (
                          <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                            <AlertTriangle className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {property.title.length > 30
                            ? property.title.substring(0, 30) + '...'
                            : property.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {property.type}, {property.operation}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {property.author?.username || 'Usuario'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {property.author?.email || 'Sin email'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {property.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${property.price.toLocaleString('es-MX')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(property.created_at).toLocaleDateString('es-MX')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link href={`/propiedad/${property.id}`} target="_blank">
                        <Button variant="outline" size="sm" className="px-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <form
                        action={`/admin/properties/action?id=${property.id}&action=${property.status === 'active' ? 'disable' : 'enable'}`}
                        method="POST"
                      >
                        <Button
                          type="submit"
                          variant={property.status === 'active' ? 'destructive' : 'default'}
                          size="sm"
                          className="px-2"
                        >
                          {property.status === 'active' ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                      </form>
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
                  {Math.min(currentPage * pageSize, pagination.totalItems)}
                </span>{' '}
                de <span className="font-medium">{pagination.totalItems}</span> resultados
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <Link
                  href={{
                    pathname: '/admin/properties',
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                {pages.map(page => (
                  <Link
                    key={page}
                    href={{
                      pathname: '/admin/properties',
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
                    pathname: '/admin/properties',
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
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
