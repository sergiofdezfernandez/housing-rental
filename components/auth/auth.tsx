import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { supabase } from '../../lib/supabase-client';

interface AuthProps {
  isAuthenticated: boolean;
}

export const withAuth = (WrappedComponent: React.FC<AuthProps>): React.FC<AuthProps> => {
  const Auth: React.FC<AuthProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const getUserProfile = async (): Promise<void> => {
        const { data } = await supabase.auth.getUser();
        if (data.user == null && !props.isAuthenticated) {
          router.push('/login');
        }
      };
      void getUserProfile();
    }, [props.isAuthenticated, router]);

    if (!props.isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Auth;
};
