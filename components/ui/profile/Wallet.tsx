import { useWeb3Context, IWeb3Context } from '@/components/web3/Web3Context';
import { supabase } from '@/lib/supabase-client';
import { User } from '@supabase/supabase-js';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

export default function Wallet() {
  const {
    disconnect,
    state: { isAuthenticated },
  } = useWeb3Context() as IWeb3Context;

  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setUserData(data.session?.user);
      } catch (error) {
        console.error('Error feching user data');
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      {isAuthenticated && <Button onClick={disconnect}>Disconnect wallet</Button>}
      <p>{userData?.id}</p>
    </section>
  );
}
