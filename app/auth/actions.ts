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
    redirect(`/auth/login?errorStatus=${error.status}&errorDescription=${error.message}`);
  }

  revalidatePath('/');
  redirect('/');
}

export async function signup(formData: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signUp(formData);

  if (error) {
    redirect(`/auth/signup?errorStatus=${error.status}&errorDescription=${error.message}`);
  } else {
    const { error } = await supabase
      .from('user_roles')
      .insert([{ id: data.user?.id, roles: [formData.role] }]);
    if (error) {
      redirect(`/auth/signup?errorStatus=${error.code}&errorDescription=${error.message}`);
    }
  }

  revalidatePath('/');
  redirect('/');
}
