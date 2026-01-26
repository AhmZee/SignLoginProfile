import { NextRequest, NextResponse } from 'next/server'


// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === 'signup'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('login', request.url))
  }

}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
  ],
}