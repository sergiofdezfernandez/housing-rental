'use client';
import React from 'react';
import RentPropertyForm from '@/components/RentPropertyForm';
import { createClient } from '@/lib/supabase/client';
import useUserProfile from '@/hooks/useUserProfile';

export default function RentProperty() {
  const supabase = createClient();
  const { userProfile, loading } = useUserProfile(supabase);

  return !loading && <RentPropertyForm userProfile={userProfile} />;
}
