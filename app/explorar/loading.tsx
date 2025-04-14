import { Container } from "@/components/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingExplorar() {
  return (
    <div className="py-10 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <Container>
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-full max-w-2xl mb-6" />
          <Skeleton className="h-12 w-full" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtros (lateral) */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Skeleton className="h-[600px] w-full rounded-lg" />
          </div>
          
          {/* Resultados */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <Skeleton className="h-7 w-32 mb-2" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <Skeleton className="h-10 w-44" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(9).fill(0).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-7 w-40" />
                    <div className="flex justify-between">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-center">
                <Skeleton className="h-10 w-72" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
} 