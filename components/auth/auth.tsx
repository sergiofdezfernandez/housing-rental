import { useRouter } from 'next/router';
import { useEffect, ReactElement } from 'react';
import { supabase } from '../../lib/supabase';

interface AuthProps {
  isAuthenticated: boolean;
}

export const withAuth = (WrappedComponent: React.FC<AuthProps>) => {
  const Auth: React.FC<AuthProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      supabase.auth.getUser().then(user =>{
        if(!user && !props.isAuthenticated){
          router.push('/login')
        }
      })
    }, [props.isAuthenticated,router]);

    if (!props.isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};
