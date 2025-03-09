import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export default function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/sign-in" || path === "/sign-up"

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || ""

  // Redirect logic
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Protect checkout and orders routes
  if ((path === "/checkout" || path === "/orders") && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
} 