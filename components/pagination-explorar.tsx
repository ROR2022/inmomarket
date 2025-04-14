"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

interface PaginationExplorarProps {
  currentPage: number;
  totalPages: number;
}

function PaginationExplorarContent({ currentPage, totalPages }: PaginationExplorarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Generar un array de páginas para renderizar
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const pages = [];
    
    // Siempre mostrar la primera página
    pages.push(1);
    
    // Si la página actual está cerca del inicio
    if (currentPage <= 4) {
      pages.push(2, 3, 4, 5);
      pages.push("...");
      pages.push(totalPages);
    } 
    // Si la página actual está cerca del final
    else if (currentPage >= totalPages - 3) {
      pages.push("...");
      pages.push(totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } 
    // Si la página actual está en el medio
    else {
      pages.push("...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };
  
  return (
    <div className="flex items-center gap-1">
      <Button 
        variant="outline" 
        size="icon" 
        disabled={currentPage <= 1}
        asChild
      >
        <a href={createPageUrl(currentPage - 1)}>
          <span className="sr-only">Página anterior</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </a>
      </Button>
      
      {getPageNumbers().map((page, i) => (
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2">...</span>
        ) : (
          <Button
            key={`page-${page}`}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            asChild
          >
            <a href={createPageUrl(page as number)}>
              {page}
            </a>
          </Button>
        )
      ))}
      
      <Button 
        variant="outline" 
        size="icon" 
        disabled={currentPage >= totalPages}
        asChild
      >
        <a href={createPageUrl(currentPage + 1)}>
          <span className="sr-only">Página siguiente</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </Button>
    </div>
  );
} 

export function PaginationExplorar({ currentPage, totalPages }: PaginationExplorarProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaginationExplorarContent currentPage={currentPage} totalPages={totalPages} />
    </Suspense>
  )
}