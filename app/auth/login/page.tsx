'use client';
import { handleAuthError } from '@/components/shared/error_handler';
import LoginForm from '@/components/ui/login/LoginForm';
import { AuthError } from '@supabase/supabase-js';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const searchParams = useSearchParams();
  const errorStatus = searchParams.get('errorStatus');
  const errorDescription = searchParams.get('errorDescription');

  useEffect(() => {
    if (errorStatus && errorDescription) {
      const status: number = Number(errorStatus);
      const description: string = errorDescription.toString();
      handleAuthError(new AuthError(description, status));
    }
  });

  return <LoginForm></LoginForm>;
}
