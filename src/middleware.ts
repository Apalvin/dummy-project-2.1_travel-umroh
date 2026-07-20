import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the route is /admin/dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const adminSession = request.cookies.get('admin_session');

    // If no session cookie, redirect to login page
    if (!adminSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If session exists or route is not protected, continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
