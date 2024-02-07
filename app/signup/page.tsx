'use client';

import { handleAuthError } from '@/components/shared/error_handler';
import SignupForm from '@/components/ui/signup/SignupForm';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { AuthError } from '@supabase/supabase-js';

export default function SignUp() {
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

  return <SignupForm></SignupForm>;
}
