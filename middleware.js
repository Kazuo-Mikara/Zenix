export { auth as middleware } from "@/auth/auth";

export const config = {
    matcher: [
        '/admin_dashboard/:path*',
        '/portal/:path*',
        '/dashboard/:path*',
    ],
};
