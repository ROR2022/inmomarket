import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, BarChart, Tag, Eye } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalProperties: number;
    activeProperties: number;
    byOperation: Record<string, number>;
    byType: Record<string, number>;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  // Get top operation and type (the ones with highest count)
  const topOperation = Object.entries(stats.byOperation).sort((a, b) => b[1] - a[1])[0];
  const topType = Object.entries(stats.byType).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Propiedades</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProperties}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeProperties} activas
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tipo Principal</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">
            {topType?.[0] || "N/A"}
          </div>
          <p className="text-xs text-muted-foreground">
            {topType?.[1] || 0} propiedades
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Operación Principal</CardTitle>
          <Tag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold capitalize">
            {topOperation?.[0] || "N/A"}
          </div>
          <p className="text-xs text-muted-foreground">
            {topOperation?.[1] || 0} propiedades
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tasa de Actividad</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.totalProperties 
              ? Math.round((stats.activeProperties / stats.totalProperties) * 100) 
              : 0}%
          </div>
          <p className="text-xs text-muted-foreground">
            Propiedades activas
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 