'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Settings, Users, Home, ShoppingBag, BarChart3, MessageSquare, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  adminLevel: string;
}

export default function AdminDashboardLayout({ children, adminLevel }: AdminDashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
//fixed z-20 top-4 left-4
  return (
    <div className="flex min-h-screen flex-col">
      
      {/* Contenido del admin */}
      <div className="flex flex-1">
        {/* Mobile menu button */}
      <div className="md:hidden absolute">
        <Button 
          variant="outline" 
          size="icon" 
          className="bg-white" 
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

        {/* Sidebar - Móvil (overlay) */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10 md:hidden" 
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside 
          className={`fixed md:static z-10 w-64 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-500 mt-1">Nivel: {adminLevel}</p>
            </div>
            <nav className="mt-5 flex-1 px-3 space-y-1">
              <Link 
                href="/admin" 
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <Home className="mr-3 h-5 w-5 text-gray-500" />
                Dashboard
              </Link>
              <Link 
                href="/admin/users" 
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <Users className="mr-3 h-5 w-5 text-gray-500" />
                Usuarios
              </Link>
              <Link 
                href="/admin/properties" 
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <ShoppingBag className="mr-3 h-5 w-5 text-gray-500" />
                Propiedades
              </Link>
              <Link 
                href="/admin/statistics" 
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                onClick={() => setSidebarOpen(false)}
                style={{display: 'none'}}
              >
                <BarChart3 className="mr-3 h-5 w-5 text-gray-500" />
                Estadísticas
              </Link>
              <Link 
                href="/admin/messages" 
                className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                onClick={() => setSidebarOpen(false)}
              >
                <MessageSquare className="mr-3 h-5 w-5 text-gray-500" />
                Mensajes
              </Link>
              {adminLevel === 'owner' && (
                <Link 
                  href="/admin/settings" 
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 text-gray-700"
                  onClick={() => setSidebarOpen(false)}
                  style={{display: 'none'}}
                >
                  <Settings className="mr-3 h-5 w-5 text-gray-500" />
                  Configuración
                </Link>
              )}
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 pt-12 md:pt-0">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 