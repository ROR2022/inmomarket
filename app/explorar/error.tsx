"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Container } from "@/components/Container"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Registrar el error en un servicio de monitoreo
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen py-12 bg-slate-50 dark:bg-slate-950">
      <Container>
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center">
          <div className="p-4 mb-6 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
          </div>
          
          <h1 className="mb-4 text-3xl font-bold">Ocurrió un error al cargar las propiedades</h1>
          
          <p className="mb-8 text-lg text-muted-foreground">
            Lo sentimos, no pudimos cargar las propiedades en este momento. Por favor, intenta nuevamente o regresa a la página principal.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={reset} size="lg">
              Intentar nuevamente
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
} 