'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Eye, Clock, Banknote, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Deposit } from "@/services/deposit";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface DepositManagementProps {
  initialDeposits: Deposit[];
}

export default function DepositManagement({ initialDeposits }: DepositManagementProps) {
  const [deposits, setDeposits] = useState<Deposit[]>(initialDeposits);

  // Formato de fecha
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd MMM yyyy, HH:mm", { locale: es });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  // Mapeo de estados a colores y etiquetas
  const statusMap: Record<string, { label: string; variant: "default" | "outline" | "secondary" | "destructive" | "success" }> = {
    pending: { label: "Pendiente", variant: "outline" },
    completed: { label: "Completado", variant: "success" },
    canceled: { label: "Cancelado", variant: "destructive" },
    refunded: { label: "Reembolsado", variant: "secondary" }
  };

  // Función para renderizar el icono según el estado
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'canceled':
        return <XCircle className="h-4 w-4" />;
      case 'refunded':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      {deposits.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-muted-foreground mb-4">
              No tienes depósitos realizados
            </p>
            <Button asChild>
              <Link href="/explorar">
                Explorar propiedades
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {deposits.map((deposit) => (
            <Card key={deposit.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold">Depósito para: {deposit.listing_title}</h3>
                      <Badge variant={statusMap[deposit.status]?.variant || "outline"} className="capitalize">
                        {getStatusIcon(deposit.status)}
                        <span className="ml-1">{statusMap[deposit.status]?.label || deposit.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        <span>Monto: ${deposit.deposit_amount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Creado: {formatDate(deposit.created_at)}</span>
                      </div>
                      {deposit.expires_at && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Expira: {formatDate(deposit.expires_at)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/explorar/${deposit.listing_id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver propiedad
                      </Link>
                    </Button>
                    
                    {deposit.status === 'pending' && (
                      <Button size="sm" variant="secondary" asChild>
                        <Link href={`/deposit/status/${deposit.id}`}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver estado
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      )}
    </div>
  );
} 