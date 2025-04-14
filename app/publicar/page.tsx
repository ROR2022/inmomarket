import { redirect } from 'next/navigation';
import { Container } from '@/components/Container';
import { createClient } from '@/utils/supabase/server';
import { CreatePropertyForm } from '@/components/create-property-form';

export const metadata = {
  title: 'Publicar Propiedad | InmoMarket',
  description: 'Publica tu propiedad y alcanza a miles de compradores potenciales',
};

export default async function PublicarPage() {
  const supabase = await createClient();
  
  // Verificar si el usuario está autenticado
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/sign-in?returnTo=/publicar');
  }
  
  // Obtener el perfil del usuario para verificar el rol
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  
  // Verificar si el usuario tiene permiso para publicar (seller o agent)
  if (!profile || !['seller', 'agent', 'admin', 'buyer'].includes(profile.role)) {
    redirect('/');
  }
  
  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Publicar Propiedad</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete el formulario para publicar su propiedad en nuestra plataforma
          </p>
        </div>
        <CreatePropertyForm userId={user.id} />
      </Container>
    </div>
  );
} 