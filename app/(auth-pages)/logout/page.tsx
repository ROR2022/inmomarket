'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signOutAction } from '@/app/actions';
import { Loader2 } from 'lucide-react';
export default function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    await signOutAction();
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col items-center justify-center w-full mt-10">
      <h1 className="text-2xl font-bold mb-4">¿Estás seguro de querer cerrar sesión?</h1>
      <div className="flex items-center justify-center gap-4">
        <Link href="/" className="text-sm text-muted-foreground">
          Volver al inicio
        </Link>
        <Button onClick={handleLogout} disabled={isLoading}>
          {isLoading ? 'Cerrando sesión...' : 'Cerrar sesión'}
          {isLoading && <Loader2 className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
