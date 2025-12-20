import NextAuth from "next-auth";


export default NextAuth(authConfig).auth;

export const config = {
    matcher: [
        '/admin_dashboard/:path*',
        '/portal/:path*',
        '/dashboard/:path*',
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
