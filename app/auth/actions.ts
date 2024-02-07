'use server';
import { createClient } from '@/lib/supabase/actions';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    redirect(`/login?errorStatus=${error.status}&errorDescription=${error.message}`);
  }

  revalidatePath('/');
  redirect('/');
}

export async function signup(formData: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp(formData);

  if (error) {
    redirect(`/signup?errorStatus=${error.status}&errorDescription=${error.message}`);
  }

  revalidatePath('/');
  redirect('/');
}
