import NextAuth from "next-auth";
import { authConfig } from "@/auth/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
    matcher: [
        '/admin_dashboard/:path*',
        '/portal/:path*',
        '/dashboard/:path*',
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
