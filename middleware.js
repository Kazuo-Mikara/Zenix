export { auth as middleware } from "@/auth/auth";

export const config = {
    matcher: [
        '/admin_dashboard/:path*',
        '/portal/:path*',
        '/dashboard/:path*',
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
