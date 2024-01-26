import { Database } from '@/lib/model/database-auth.types';
import { SignUpForm } from '@/lib/model/forms_definitions';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body: SignUpForm = await request.json();
  const email = body.email;
  const password = body.password;
  const role = body.role;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    return NextResponse.json(error);
  }
  if (data) {
    const { error } = await supabase
      .from('user_roles')
      .insert({ id: data.user?.id, role_name: role });
    if (error) {
      return NextResponse.json(error);
    }
    return NextResponse.json({ status: 200 });
  }
}
