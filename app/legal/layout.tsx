import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import LegalLinks from '@/components/LegalLinks';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px overflow-x-auto">
              <LegalLinks 
                variant="horizontal" 
                className="px-6 py-4 space-x-8 whitespace-nowrap" 
              />
            </nav>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="prose dark:prose-invert max-w-none">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 