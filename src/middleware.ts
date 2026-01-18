import { NextRequest, NextResponse } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/admin"];

// Routes only for non-authenticated users
const authRoutes = ["/login", "/signup", "/forgot-password"];

// Routes that are always public
const publicRoutes = ["/", "/free", "/sop", "/certification", "/launchpad", "/blog", "/terms", "/privacy", "/refund", "/earnings"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get session from cookie
    const session = request.cookies.get("__session")?.value;

    // Check if route is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Check if route is auth-only (login, signup)
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect to dashboard if accessing auth routes with session
    if (isAuthRoute && session) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Continue with request
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         * - api routes (handled separately)
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|api).*)",
    ],
};
