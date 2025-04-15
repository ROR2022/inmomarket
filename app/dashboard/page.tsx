import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getUserStats, getUserProperties } from '@/app/actionsProperties';
import PropertyManagement from '@/components/dashboard/property-management';
import DashboardStats from '@/components/dashboard/dashboard-stats';

export const metadata = {
  title: 'Dashboard - InmoMarket',
  description: 'Administra tus propiedades y revisa estadísticas de tu cuenta',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/iniciar-sesion?redirect=/dashboard');
  }
  
  const stats = await getUserStats(user.id);
  const { properties, pagination } = await getUserProperties(user.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <DashboardStats stats={stats} />
      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Tus Propiedades</h2>
        <PropertyManagement 
          initialProperties={properties} 
          initialPagination={pagination} 
        />
      </div>
    </div>
  );
}