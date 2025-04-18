'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';

const DepositSuccessContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const searchParams = useSearchParams();
  const listingId = searchParams.get('listing');
  const paymentId = searchParams.get('payment_id');
  const preferenceId = searchParams.get('preference_id');
  const router = useRouter();

  useEffect(() => {
    getDeposit();
  }, []);

  useEffect(() => {
    if (listingId && paymentId && preferenceId && !isUpdated) {
      updateDeposit();
    }
  }, [listingId, paymentId, preferenceId, isUpdated]);

  const updateDeposit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/deposit/update', {
        paymentId,
        preferenceId,
      });
      console.log('app/deposit/success/page.tsx updateDeposit response: ', response);
    } catch (error) {
      console.error('app/deposit/success/page.tsx updateDeposit error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDeposit = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/deposit/retrive', {
        params: {
          preferenceId,
        },
      });
      console.log('app/deposit/success/page.tsx getDeposit response: ', response);
      if (response) {
        const { data } = response;
        console.log('app/deposit/success/page.tsx getDeposit data: ', data);
        if (data.status === 'completed') {
          setIsUpdated(true);
        }
      }
    } catch (error) {
      console.error('app/deposit/success/page.tsx getDeposit error: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container py-20">
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-20">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <CardTitle className="text-center">Depósito realizado con éxito</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={() => router.push('/explorar')}>
            Seguir explorando
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const DepositSuccess = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DepositSuccessContent />
    </Suspense>
  );
};

export default DepositSuccess;
