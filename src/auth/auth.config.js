
export const authConfig = {
    pages: {
        signIn: "/auth/login", // Default sign-in page
        error: "/auth/error" // Custom error page
    },
    session: {
        strategy: "jwt",
        maxAge: 3 * 24 * 60 * 60,
    },
    providers: [],
    callbacks: {
        async authorized({ request, auth }) {
            const { pathname } = request.nextUrl;

            // Admin dashboard routes
            if (pathname.startsWith('/admin_dashboard') && !pathname.startsWith('/admin_dashboard/auth')) {
                const isAdmin = auth?.user?.role === 'admin' && auth?.user?.status === 'active';
                return isAdmin;
            }

            // Portal routes
            if (pathname.startsWith('/portal') && !pathname.startsWith('/portal/auth')) {
                const isMentor = auth?.user?.role === 'mentor' && auth?.user?.status === 'active';
                return isMentor;
            }

            // Home routes - check status
            if (pathname.startsWith('/home') && !pathname.startsWith('/home/auth')) {
                const isActive = auth?.user?.status === 'active';
                return isActive;
            }

            // Platform dashboard routes
            if (pathname.startsWith('/dashboard')) {
                const hasAccess = (auth?.user?.role === 'student' || auth?.user?.role === 'admin')
                    && auth?.user?.status === 'active';
                return hasAccess;
            }

            return true;
        },

        async jwt({ token, user, trigger }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.userName = user.userName;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.status = user.status;
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.userName = token.userName;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.status = token.status;
            }
            return session;
        }
    },
    trustHost: true,
    secret: process.env.AUTH_SECRET,
};
