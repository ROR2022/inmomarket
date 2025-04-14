import { getPropertyById } from '@/app/actionsProperties'
import React from 'react'
import PropertyDetails from './property-details'
import { Container } from '@/components/Container'
import { Frown } from 'lucide-react'

export const metadata = {
  title: 'Detalles de propiedad | InmoMarket',
  description: 'Ver información detallada de esta propiedad en InmoMarket',
}

const ExplorarPropiedad = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params
  const propiedad = await getPropertyById(id)
  
  return (
    <main>
      {propiedad && <PropertyDetails property={propiedad} />}
      
      {!propiedad && (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-16">
          <Container>
            <div className="text-center space-y-4 py-10">
              <Frown className="w-16 h-16 mx-auto text-muted-foreground" />
              <h1 className="text-3xl font-bold">Propiedad no encontrada</h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                No pudimos encontrar la propiedad que estás buscando. Es posible que haya sido eliminada o que la URL sea incorrecta.
              </p>
            </div>
          </Container>
        </div>
      )}
    </main>
  )
}

export default ExplorarPropiedad