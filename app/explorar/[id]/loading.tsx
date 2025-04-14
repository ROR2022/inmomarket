import React from 'react'
import { Container } from '@/components/Container'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Loading() {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8">
      <Container>
        {/* Skeleton para el botón de volver */}
        <Skeleton className="h-6 w-32 mb-6" />

        {/* Esqueleto principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Título y detalles principales */}
            <div>
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-5 w-1/2 mb-4" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>

            {/* Galería de imágenes */}
            <Skeleton className="aspect-[16/9] w-full rounded-lg" />

            {/* Características principales */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col items-center p-4 text-center">
                      <Skeleton className="h-6 w-6 mb-2 rounded-full" />
                      <Skeleton className="h-7 w-10 mb-1" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Descripción */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-7 w-40 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>

            {/* Características adicionales */}
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-7 w-40 mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna lateral (1/3) */}
          <div className="space-y-6">
            {/* Precio y acciones */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <Skeleton className="h-4 w-16 mb-1" />
                  <Skeleton className="h-9 w-40" />
                </div>

                <Separator />

                {/* Info del vendedor/agente */}
                <div className="space-y-4">
                  <Skeleton className="h-4 w-32" />
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-1" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Acciones */}
                <div className="space-y-3">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  )
} 