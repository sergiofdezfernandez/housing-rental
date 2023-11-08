import { Database } from '@/components/model/database-auth.types';
import { LoginForm } from '@/components/model/forms_models';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body: LoginForm = await request.json();
  const email = body.email;
  const password = body.password;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore });
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(error);
  } else {
    return NextResponse.json({ status: 200 });
  }
}
