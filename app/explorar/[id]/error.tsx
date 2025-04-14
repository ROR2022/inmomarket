'use client'

import React from 'react'
import { Container } from '@/components/Container'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16">
      <Container>
        <div className="text-center space-y-6 py-10 max-w-xl mx-auto">
          <AlertTriangle className="w-16 h-16 mx-auto text-destructive" />
          <h1 className="text-3xl font-bold">Ocurrió un error</h1>
          <p className="text-lg text-muted-foreground">
            No pudimos cargar la información de la propiedad. Por favor, inténtalo de nuevo más tarde.
          </p>
          <div className="flex gap-4 justify-center mt-6">
            <Button onClick={reset} variant="default">
              Intentar de nuevo
            </Button>
            <Button variant="outline" asChild>
              <Link href="/explorar">
                Volver a la búsqueda
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
} 