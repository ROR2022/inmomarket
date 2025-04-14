'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOutAction } from '@/app/actions';
export default function Logout() {
  const handleLogout = async () => {
    await signOutAction();
  };
  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <h1 className="text-2xl font-bold mb-4">¿Estás seguro de querer cerrar sesión?</h1>
      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="text-sm text-muted-foreground">
          Volver al inicio
        </Link>
        <Button onClick={handleLogout}>Cerrar sesión</Button>
      </div>
    </div>
  );
}
