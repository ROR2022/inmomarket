import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft, Home, Users, Shield } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Sobre Nosotros - InmoMarket',
  description: 'Conozca más sobre InmoMarket, nuestra misión, visión y el equipo detrás de la plataforma inmobiliaria líder.'
};

// Componentes personalizados para MDX
const components = {
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-2xl md:text-3xl font-semibold text-primary mt-10 mb-4" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-xl md:text-2xl font-medium text-primary mt-6 mb-3" {...props}>
      {children}
    </h3>
  ),
  p: (props: any) => (
    <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed" {...props} />
  ),
  ul: (props: any) => (
    <ul className="space-y-2 mb-6 ml-6" {...props} />
  ),
  li: (props: any) => (
    <li className="text-gray-700 dark:text-gray-300" {...props} />
  ),
};

export default async function SobreNosotrosPage() {
  // Leer el contenido del archivo MDX
  const filePath = path.join(process.cwd(), 'legal', 'sobre-nosotros.mdx');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 text-white py-20">
        <div className="absolute inset-0 bg-[url('/oficina_inmobiliaria.jpeg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="text-xl opacity-90">
              Conozca más sobre InmoMarket, nuestra misión y el equipo detrás de la plataforma inmobiliaria líder.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>

        {/* Nuestros Servicios Section */}
        <div className="mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Nuestros Servicios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Propiedades exclusivas</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ofrecemos acceso a propiedades seleccionadas y verificadas con los más altos estándares de calidad en ubicaciones privilegiadas.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Atención personalizada</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Contamos con un equipo de profesionales disponibles 24/7 para atender todas sus consultas y guiarle durante todo el proceso de compra o alquiler.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Garantía inmobiliaria</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Todas nuestras propiedades cuentan con garantía legal completa, asegurando transparencia y seguridad en cada transacción.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar con información destacada */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-4 text-primary">Información de Contacto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Correo</p>
                    <p className="font-medium">contacto@inmomarket.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Teléfono</p>
                    <p className="font-medium">+XX XXX XXX XXX</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dirección</p>
                    <p className="font-medium">Av. Principal 123, Ciudad</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4 text-primary">Nuestros Valores</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    <span>Transparencia</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    <span>Innovación</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    <span>Seguridad</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    <span>Comunidad</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-2 w-2 bg-primary rounded-full mr-2"></div>
                    <span>Accesibilidad</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Contenido principal del MDX */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="prose dark:prose-invert max-w-none">
                <MDXRemote source={fileContent} components={components} />
              </div>
              
              {/* Sección de Equipo con fotos */}
              <div className="mt-12 mb-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-8">Conoce a Nuestro Equipo</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/40" aria-hidden="true"></div>
                      <div className="flex items-center justify-center h-full">
                        <span className="sr-only">Foto de María Rodríguez</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg">María Rodríguez</h3>
                    <p className="text-primary font-medium">Fundadora y CEO</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/40" aria-hidden="true"></div>
                      <div className="flex items-center justify-center h-full">
                        <span className="sr-only">Foto de Carlos Vega</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg">Carlos Vega</h3>
                    <p className="text-primary font-medium">CTO</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary/20">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary/40" aria-hidden="true"></div>
                      <div className="flex items-center justify-center h-full">
                        <span className="sr-only">Foto de Ana Martínez</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg">Ana Martínez</h3>
                    <p className="text-primary font-medium">Directora de Operaciones</p>
                  </div>
                </div>
              </div>
              
              {/* Sección de estadísticas */}
              <div className="mt-12 bg-gray-100 dark:bg-gray-700 rounded-lg p-8">
                <h2 className="text-2xl font-semibold text-primary mb-6 text-center">InmoMarket en Números</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                    <p className="text-gray-600 dark:text-gray-300">Propiedades listadas</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">500+</div>
                    <p className="text-gray-600 dark:text-gray-300">Agentes inmobiliarios</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                    <p className="text-gray-600 dark:text-gray-300">Usuarios satisfechos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 