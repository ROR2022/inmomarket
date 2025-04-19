import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { isUserAdmin } from '@/utils/admin-auth';
import AdminDashboardLayout from '@/components/admin/admin-dashboard-layout';

export const metadata = {
  title: 'Admin - InmoMarket',
  description: 'Panel de administración de InmoMarket',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/sign-in?redirect=/admin');
  }
  
  const { isAdmin, adminLevel } = await isUserAdmin(user.id);
  
  if (!isAdmin) {
    redirect('/dashboard');
  }
  
  return <AdminDashboardLayout adminLevel={adminLevel}>{children}</AdminDashboardLayout>;
} 