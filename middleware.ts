import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import type { Database } from './lib/model/database-auth.types';

export async function middleware(req: NextRequest) {
  // const allowedPaths = ['/login', '/signup', '/auth/login', '/auth/signup'];
  const res = NextResponse.next();
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  await supabase.auth.getSession()

  // const { data: { user } } = await supabase.auth.getUser();

  // if (user && req.nextUrl.pathname === '/') {
  //   return NextResponse.redirect(new URL('/', req.url))
  // }
  // if (!user && !allowedPaths.includes(req.nextUrl.pathname)) {
  //   return NextResponse.redirect(new URL('/login', req.url))
  // }

  return res;
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ],
}