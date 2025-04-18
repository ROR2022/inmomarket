'use client';

import React, { useState } from 'react';
import { Property } from '@/types/property';
import { Container } from '@/components/Container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import {
  Bed,
  Bath,
  Square,
  Home,
  MapPin,
  Calendar,
  Heart,
  Share2,
  ChevronLeft,
  Clock,
  Tag,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import ModalDeposit from './modal-deposit';

const PropertyDetails = ({ property }: { property: Property }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  // Formato del precio con separador de miles
  const formattedPrice = new Intl.NumberFormat('es-MX', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(property.price);

  // Mapeo de tipos de propiedad a nombres más amigables
  const propertyTypes = {
    casa: 'Casa',
    departamento: 'Departamento',
    terreno: 'Terreno',
    oficina: 'Oficina',
    local: 'Local comercial',
  };

  // Mapeo de tipos de operación a etiquetas
  const operationLabels: Record<string, string> = {
    venta: 'Venta',
    alquiler: 'Alquiler',
    alquiler_temporal: 'Temporal',
  };

  // Formato de fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // Verificar si hay imágenes disponibles
  const propertyMedia = property.property_media || [];
  const hasImages = propertyMedia.length > 0;

  // Obtener solo las imágenes del array de medios
  const propertyImages = propertyMedia.filter(media => media.type === 'image');

  // Procesamos las URLs para incluir la ruta completa de Supabase Storage
  const mediaBaseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-media/`;

  // Filtrar datos de contacto del propietario
  //const contactInfo = property.property_details?.details?.contactInfo || {};

  // Determinar características reales de la propiedad
  const features = Array.isArray(property.features) ? property.features : [];

  const handleDeposit = () => {
    console.log('Hacer Deposito');
    setIsOpenModal(true);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-8">
      <ModalDeposit
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        listingId={property.id}
        listingTitle={property.title}
      />
      <Container>
        {/* Botón de volver atrás */}
        <Link
          href="/explorar"
          className="inline-flex items-center mb-6 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Volver a la búsqueda
        </Link>

        {/* Sección principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Título y detalles principales */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" title="Compartir propiedad">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" title="Guardar en favoritos">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
              </div>
              <div className="flex flex-wrap gap-4 mb-4">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Tag className="h-3.5 w-3.5 mr-1.5" />
                  {operationLabels[property.operation || 'venta']}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Home className="h-3.5 w-3.5 mr-1.5" />
                  {propertyTypes[property.type as keyof typeof propertyTypes] || property.type}
                </Badge>
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Clock className="h-3.5 w-3.5 mr-1.5" />
                  Publicado: {formatDate(property.created_at)}
                </Badge>
              </div>
            </div>

            {/* Galería de imágenes */}
            <div className="overflow-hidden rounded-lg bg-white dark:bg-slate-900 shadow-sm">
              {hasImages ? (
                <Carousel className="w-full">
                  <CarouselContent>
                    {propertyImages.map((media, index) => (
                      <CarouselItem key={media.id || index}>
                        <div className="relative aspect-[16/9] w-full">
                          <Image
                            src={media.fullUrl || mediaBaseUrl + media.url}
                            alt={`${property.title} - Imagen ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                            priority={index === 0}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              ) : (
                <div className="relative aspect-[16/9] w-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <p className="text-muted-foreground">No hay imágenes disponibles</p>
                </div>
              )}
            </div>

            {/* Características principales */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.bedrooms !== undefined && (
                    <div className="flex flex-col items-center p-4 text-center">
                      <Bed className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-2xl font-semibold">{property.bedrooms}</span>
                      <span className="text-sm text-muted-foreground">Habitaciones</span>
                    </div>
                  )}
                  {property.bathrooms !== undefined && (
                    <div className="flex flex-col items-center p-4 text-center">
                      <Bath className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-2xl font-semibold">{property.bathrooms}</span>
                      <span className="text-sm text-muted-foreground">Baños</span>
                    </div>
                  )}
                  {property.area !== undefined && (
                    <div className="flex flex-col items-center p-4 text-center">
                      <Square className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-2xl font-semibold">{property.area}</span>
                      <span className="text-sm text-muted-foreground">m²</span>
                    </div>
                  )}
                  <div className="flex flex-col items-center p-4 text-center">
                    <Calendar className="h-6 w-6 mb-2 text-primary" />
                    <span className="text-2xl font-semibold">
                      {new Date(property.created_at).getFullYear()}
                    </span>
                    <span className="text-sm text-muted-foreground">Año publicación</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Descripción */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">{property.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Características adicionales */}
            {features.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Características</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Detalles extra de propiedad (si existen) */}
            {property.property_details &&
              Object.keys(property.property_details.details || {}).length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Detalles adicionales</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                      {Object.entries(property.property_details.details || {}).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between border-b pb-2"
                          >
                            <span className="font-medium capitalize">{key.replace(/_/g, ' ')}</span>
                            <span>{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

            {/* Mapa (placeholder) */}
            {property.latitude && property.longitude && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
                  <div className="bg-slate-200 dark:bg-slate-800 rounded-md aspect-video flex items-center justify-center">
                    <p className="text-muted-foreground">Mapa no disponible en este momento</p>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    {property.address}, {property.city || property.location}
                    {property.zipcode && `, CP ${property.zipcode}`}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Columna lateral (1/3) */}
          <div className="space-y-6">
            {/* Precio y acciones */}
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div>
                  <p className="text-sm uppercase text-muted-foreground mb-1">Precio</p>
                  <p className="text-3xl font-bold">
                    ${formattedPrice} <span className="text-lg">{property.currency}</span>
                  </p>
                </div>

                <Separator />

                {/* Info del vendedor/agente */}
                {property.author && (
                  <div className="space-y-4">
                    <p className="text-sm uppercase text-muted-foreground">Publicado por</p>
                    <div className="flex items-center gap-3">
                      {property.author.avatar_url ? (
                        <Image
                          src={property.author.avatar_url}
                          alt={property.author.username || 'Vendedor'}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {(property.author.username || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">
                          {property.author.username || 'Usuario de InmoMarket'}
                        </p>
                        <p className="text-sm text-muted-foreground">Propietario</p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Acciones */}
                <div className="flex flex-col gap-3">
                  <Button className="w-full" size="lg">
                    <Link href={`/contacto?property=${property.id}`}>Contactar</Link>
                  </Button>

                  <Button
                    onClick={handleDeposit}
                    variant="outline"
                    color="secondary"
                    className="w-full"
                    size="lg"
                  >
                    Hacer Deposito
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PropertyDetails;
