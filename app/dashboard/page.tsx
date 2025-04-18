import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getUserStats, getUserProperties } from '@/app/actionsProperties';
import PropertyManagement from '@/components/dashboard/property-management';
import DashboardStats from '@/components/dashboard/dashboard-stats';
import DepositManagement from '@/components/dashboard/deposit-management';
import { getDepositsByUserId } from '@/services/deposit';
import { Separator } from '@/components/ui/separator';
//import axios from 'axios';

export const metadata = {
  title: 'Dashboard - InmoMarket',
  description: 'Administra tus propiedades y revisa estadísticas de tu cuenta',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let stats;
  let properties;
  let pagination;
  let deposits;
  if (!user) {
    redirect('/sign-in?redirect=/dashboard');
  }
  try {
    stats = await getUserStats(user.id);
    ({ properties, pagination } = await getUserProperties(user.id));
    deposits = await getDepositsByUserId(user.id);
    //console.log('app/dashboard/page.tsx deposits: ', deposits);
  } catch (error) {
    console.error('Error al obtener las estadísticas:', error);
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      {stats && <DashboardStats stats={stats} />}
      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Tus Propiedades</h2>
        {properties && pagination && (
        <PropertyManagement 
          initialProperties={properties} 
          initialPagination={pagination} 
        />
        )}
      </div>
      
      <Separator className="my-8" />
      
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Tus Depósitos</h2>
        {deposits && (
          <DepositManagement initialDeposits={deposits} />
        )}
      </div>
    </div>
  );
}