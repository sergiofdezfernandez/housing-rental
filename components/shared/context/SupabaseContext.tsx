import { createClient } from '@/lib/supabase/client';
import React, { ReactNode, createContext, useContext } from 'react';

const SupabaseContext = createContext<any>(null);

export const SupabaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const supabase = createClient();

  return <SupabaseContext.Provider value={supabase}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
  const supabase = useContext(SupabaseContext);
  if (!supabase) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return supabase;
};
