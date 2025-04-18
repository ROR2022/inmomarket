//este componente se encarga de mostrar el modal de depósito
//se muestra cuando el usuario hace click en el botón de depósito
//se muestra el modal con el formulario de depósito donde se pide el monto del depósito
//se usan componentes de shadcn/ui
//se usa el hook useForm de react-hook-form para manejar el formulario

'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
const ModalDeposit = ({
  isOpen,
  onClose,
  listingId,
  listingTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  listingId: string;
  listingTitle: string;
}) => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    console.log('data deposit: ', data);
    const depositAmount = data.depositAmount;
    if (depositAmount <= 0) {
      console.error('error deposit: ', 'El monto del depósito debe ser mayor a 0');
      toast({
        title: 'Error',
        description: 'El monto del depósito debe ser mayor a 0',
        variant: 'destructive',
      });
      return;
    }
    try {
      setIsLoading(true);
      const responseDeposit = await axios.post('/api/deposit/create', {
        listingId,
        listingTitle,
        depositAmount,
      });
      console.log('modal-deposit.tsx response deposit: ', responseDeposit);
      
      //se redirige a la url de la preferencia de pago
      const preferenceUrl = responseDeposit?.data?.preferenceUrl;
      console.log('modal-deposit.tsx preferenceUrl: ', preferenceUrl);
      if (preferenceUrl) {
        console.log('modal-deposit.tsx redirecting to: ', preferenceUrl);
        router.push(preferenceUrl);
      } else {
        toast({
          title: 'Error',
          description: 'Error al crear el depósito',
          variant: 'destructive',
        });
      }
      //onClose();
    } catch (error) {
      console.error('error deposit: ', error);
      const errorMessage = (error as unknown as { response: { data: { error: string } } })
        .response?.data?.error || 'Error al crear el depósito';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              <span className="text-2xl font-bold my-3 block">Crear depósito</span>
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Input type="number" placeholder="Monto del depósito" {...register('depositAmount')} />
            <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
              {isLoading ? 'Creando Depósito...' : 'Crear Depósito'}
              {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </DialogDescription>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDeposit;
