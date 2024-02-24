import { useState, useEffect } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import { User } from '@/lib/model/domain_definitions';

const useUserProfile = (supabase: SupabaseClient) => {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        if (userError) {
          throw userError;
        }

        const { data: userRoleData, error: userRoleError } = await supabase
          .from('user_roles')
          .select('*')
          .eq('id', userData?.user.id);

        if (userRoleError) {
          throw userRoleError;
        }

        setUserProfile({
          email: userData.user.email,
          role: userRoleData[0]?.role_name,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [supabase]);

  return { userProfile, loading };
};

export default useUserProfile;
