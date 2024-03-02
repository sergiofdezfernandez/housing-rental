'use client';
import React from 'react';
import RegisterPropertyForm from '@/components/ui/RegisterPropertyForm';
import useUserProfile from '@/hooks/useUserProfile';
import { createClient } from '@/lib/supabase/client';

export default function RegisterProperty() {
  const supabase = createClient();
  const { userProfile, loading } = useUserProfile(supabase);
  return !loading && <RegisterPropertyForm userProfile={userProfile}></RegisterPropertyForm>;
}
