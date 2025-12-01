import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import dbConnect from "../lib/mongoose";
import Users from "@/models/Users/User";
import Admin from "@/models/Admin/Admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Admin Provider
        Credentials({
            id: "admin",
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                await dbConnect();

                const admin = await Admin.findOne({ email: credentials.email.toLowerCase() });

                if (!admin) return null;

                const isValid = await admin.comparePassword(credentials.password);
                if (!isValid) return null;

                // Check account status
                if (admin.status && (admin.status === 'inactive' || admin.status === 'banned')) {
                    return null;
                }

                return {
                    id: admin._id.toString(),
                    userName: admin.userName,
                    email: admin.email,
                    role: 'admin',
                };
            }
        }),

        // Portal Provider (for mentors)
        Credentials({
            id: "portal",
            name: "Portal Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                await dbConnect();

                const user = await Users.findOne({ email: credentials.email.toLowerCase() });

                if (!user) return null;

                const isValid = await user.comparePassword(credentials.password);
                if (!isValid) return null;

                // Only allow mentor role
                if (user.role !== 'mentor') return null;

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                };
            }
        }),

        // Platform Provider (for students)
        Credentials({
            id: "platform",
            name: "Platform Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                await dbConnect();

                const user = await Users.findOne({ email: credentials.email.toLowerCase() });

                if (!user) return null;

                const isValid = await user.comparePassword(credentials.password);
                if (!isValid) return null;

                // Only allow student role
                if (user.role !== 'student') return null;

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                };
            }
        })
    ],

    callbacks: {
        async authorized({ request, auth }) {
            const { pathname } = request.nextUrl;

            // Admin dashboard routes - require admin role
            if (pathname.startsWith('/admin_dashboard') && !pathname.startsWith('/admin_dashboard/auth')) {
                const isAdmin = auth?.user?.role === 'admin';
                if (!isAdmin) {
                    return false; // This will redirect to the signIn page
                }
            }

            // Portal routes - require mentor role
            if (pathname.startsWith('/portal') && !pathname.startsWith('/portal/auth')) {
                const isMentor = auth?.user?.role === 'mentor';
                if (!isMentor) {
                    return false;
                }
            }

            // Platform dashboard routes - allow students and admins
            if (pathname.startsWith('/dashboard')) {
                const hasAccess = auth?.user?.role === 'student' || auth?.user?.role === 'admin';
                if (!hasAccess) {
                    return false;
                }
            }

            return true;
        },

        async jwt({ token, user }) {
            // Add user data to token on sign in
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.userName = user.userName; // For admins
                token.firstName = user.firstName; // For students/mentors
                token.lastName = user.lastName; // For students/mentors
            }
            return token;
        },

        async session({ session, token }) {
            // Add token data to session
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.userName = token.userName; // For admins
                session.user.firstName = token.firstName; // For students/mentors
                session.user.lastName = token.lastName; // For students/mentors
            }
            return session;
        }
    },

    session: {
        strategy: "jwt",
        maxAge: 3 * 24 * 60 * 60, // 3 days
    },

    pages: {
        signIn: "/admin_dashboard/auth/login", // Redirect here for protected routes
    },
    trustHost: true, // Important for Vercel
    secret: process.env.AUTH_SECRET,
});