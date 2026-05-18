import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // TEMPORÁRIO: liberar dashboard para visualização do MVP
  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/preview",
    "/dashboard",
    "/leads",
    "/campanhas",
    "/aprovacoes",
    "/configuracoes",
  ]

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  if (isPublicRoute) return NextResponse.next()

  const sessionToken =
    req.cookies.get("next-auth.session-token") ??
    req.cookies.get("__Secure-next-auth.session-token")

  if (!sessionToken && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
