import { createClient } from '@/utils/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, ChartBar, MessageSquare, Home } from "lucide-react";

export const metadata = {
  title: 'Panel de Administración - InmoMarket',
  description: 'Panel principal de administración de InmoMarket',
};

async function getPlatformStats() {
  const supabase = await createClient();
  
  // Obtener estadísticas generales
  const { data: userCount, error: userError } = await supabase
    .from('profiles')
    .select('*');

    if (userError){
      console.error('Error al obtener el conteo de usuarios:', userError);
    }
    console.log('Conteo de usuarios:', userCount);
  
  const { data: propertiesCount, error: propertiesError } = await supabase
    .from('properties')
    .select('*');

    if (propertiesError){
      console.error('Error al obtener el conteo de propiedades:', propertiesError);
    }
    console.log('Conteo de propiedades:', propertiesCount);

  const { data: activeProperties, error: activeError } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'active');

    if (activeError){
      console.error('Error al obtener el conteo de propiedades activas:', activeError);
    }
    console.log('Conteo de propiedades activas:', activeProperties);
  // Obtener propiedades por tipo
  const { data: propertiesByType, error: typeError } = await supabase
    .from('properties')
    .select('type')
    .eq('status', 'active');

    if (typeError){
      console.error('Error al obtener las propiedades por tipo:', typeError);
    }
    console.log('Propiedades por tipo:', propertiesByType);
  // Obtener propiedades por operación
  const { data: propertiesByOperation, error: operationError } = await supabase
    .from('properties')
    .select('operation')
    .eq('status', 'active');

    if (operationError){
      console.error('Error al obtener las propiedades por operación:', operationError);
    }
    console.log('Propiedades por operación:', propertiesByOperation);
  // Analizar y calcular estadísticas
  const typeStats = propertiesByType?.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};
  
  const operationStats = propertiesByOperation?.reduce((acc, curr) => {
    acc[curr.operation] = (acc[curr.operation] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};
  
  // Devolver estadísticas completas
  return {
    userCount: userCount?.length ?? 0,
    totalProperties: propertiesCount?.length ?? 0,
    activeProperties: activeProperties?.length ?? 0,
    byType: typeStats,
    byOperation: operationStats,
    errors: [userError, propertiesError, activeError, typeError, operationError].filter(Boolean)
  };
}

export default async function AdminDashboardPage() {
  const stats = await getPlatformStats();
  
  // Calcular las estadísticas más relevantes para mostrar
  const topType = Object.entries(stats.byType).sort((a, b) => b[1] - a[1])[0] || ['N/A', 0];
  const topOperation = Object.entries(stats.byOperation).sort((a, b) => b[1] - a[1])[0] || ['N/A', 0];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
      </div>
      
      {stats.errors.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Ocurrieron algunos errores al cargar las estadísticas.
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuarios</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.userCount}</div>
            <p className="text-xs text-muted-foreground">
              Total de usuarios registrados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Propiedades</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProperties}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProperties} activas
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tipo Principal</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {topType[0]}
            </div>
            <p className="text-xs text-muted-foreground">
              {topType[1]} propiedades
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operación Principal</CardTitle>
            <ChartBar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {topOperation[0]}
            </div>
            <p className="text-xs text-muted-foreground">
              {topOperation[1]} propiedades
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/admin/users" className="flex items-center p-4 border rounded-md hover:bg-gray-50">
            <Users className="h-6 w-6 mr-3" />
            <span>Gestionar Usuarios</span>
          </a>
          <a href="/admin/properties" className="flex items-center p-4 border rounded-md hover:bg-gray-50">
            <Building className="h-6 w-6 mr-3" />
            <span>Moderar Propiedades</span>
          </a>
          <a href="/admin/messages" className="flex items-center p-4 border rounded-md hover:bg-gray-50">
            <MessageSquare className="h-6 w-6 mr-3" />
            <span>Ver Mensajes</span>
          </a>
        </div>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Estado de la Plataforma</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Propiedades Activas:</span>
            <span className="font-medium">{stats.activeProperties} de {stats.totalProperties}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${stats.totalProperties ? (stats.activeProperties / stats.totalProperties) * 100 : 0}%` }}
            ></div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">Tipos de Propiedades:</span>
          </div>
          <div className="space-y-2 mt-2">
            {Object.entries(stats.byType).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <span className="text-sm capitalize">{type}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-gray-500">Tipos de Operación:</span>
          </div>
          <div className="space-y-2 mt-2">
            {Object.entries(stats.byOperation).map(([op, count]) => (
              <div key={op} className="flex items-center justify-between">
                <span className="text-sm capitalize">{op}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}