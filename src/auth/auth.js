import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "../lib/mongoose";
import Users from "@/models/Users/User";
import Admin from "@/models/Admin/Admin";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        // Admin Provider
        Credentials({
            id: "admin",
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    await dbConnect();

                    const admin = await Admin.findOne({ email: credentials.email.toLowerCase() });

                    if (!admin) {
                        throw new Error("Invalid email or password");
                    }

                    const isValid = await admin.comparePassword(credentials.password);
                    if (!isValid) {
                        throw new Error("Invalid email or password");
                    }

                    // Check account status - MUST return null to prevent login
                    if (admin.status === 'inactive') {
                        throw new Error("Your account is inactive. Please contact support.");
                    }

                    if (admin.status === 'banned') {
                        throw new Error("Your account has been banned. Please contact support.");
                    }

                    return {
                        id: admin._id.toString(),
                        userName: admin.userName,
                        email: admin.email,
                        role: 'admin',
                        status: admin.status
                    };
                } catch (error) {
                    console.error("Admin login error:", error);
                    throw error; // Re-throw to be caught by the login form
                }
            }
        }),

        // Instructor Provider
        Credentials({
            id: "instructor",
            name: "Instructor Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    await dbConnect();

                    const user = await Users.findOne({ email: credentials.email.toLowerCase() });

                    if (!user) {
                        throw new Error("Invalid email or password");
                    }

                    const isValid = await user.comparePassword(credentials.password);
                    if (!isValid) {
                        throw new Error("Invalid email or password");
                    }

                    // Only allow mentor role
                    if (user.role !== 'mentor') {
                        throw new Error("Access denied. This portal is for instructors only.");
                    }

                    // Check user status
                    if (user.status === 'inactive') {
                        throw new Error("Your account is inactive. Please contact support.");
                    }

                    if (user.status === 'banned') {
                        throw new Error("Your account has been banned. Please contact support.");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        role: user.role,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        status: user.status
                    };
                } catch (error) {
                    console.error("Instructor login error:", error);
                    throw error;
                }
            }
        }),

        // Portal Provider
        Credentials({
            id: "portal",
            name: "Portal Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    await dbConnect();

                    const user = await Users.findOne({ email: credentials.email.toLowerCase() });

                    if (!user) {
                        throw new Error("NO_CREDENTIALS");
                    }
                    const isValid = await user.comparePassword(credentials.password);
                    if (!isValid) {
                        throw new Error("INVALID_CREDENTIALS");
                    }

                    // Check user status BEFORE returning
                    if (user.status === 'inactive') {
                        throw new Error("ACCOUNT_INACTIVE");
                    }

                    if (user.status === 'banned') {
                        throw new Error("ACCOUNT_BANNED");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        role: user.role,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        status: user.status,
                    };
                } catch (error) {
                    console.error("Portal login error:", error);
                    throw error;
                }
            }
        }),

        // Student Provider
        Credentials({
            id: "student",
            name: "Student Login",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    await dbConnect();

                    const user = await Users.findOne({ email: credentials.email.toLowerCase() });

                    if (!user) {
                        throw new Error("Invalid email or password");
                    }

                    const isValid = await user.comparePassword(credentials.password);
                    if (!isValid) {
                        throw new Error("Invalid email or password");
                    }

                    // Only allow student role
                    if (user.role !== 'student') {
                        throw new Error("Access denied. Please use the correct login portal.");
                    }

                    // Check user status
                    if (user.status === 'inactive') {
                        throw new Error("Your account is inactive. Please contact support.");
                    }

                    if (user.status === 'banned') {
                        throw new Error("Your account has been banned. Please contact support.");
                    }

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        name: `${user.firstName} ${user.lastName}`,
                        role: user.role,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        status: user.status,
                    };
                } catch (error) {
                    console.error("Student login error:", error);
                    throw error;
                }
            }
        })
    ],

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
                token.status = user.status; // ✅ Add status to token

            }

            // Check status on every request
            if (trigger === "update" && token.id) {
                await dbConnect();
                const dbUser = await Users.findById(token.id);
                if (dbUser) {
                    token.status = dbUser.status;
                }
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
                session.user.status = token.status; // ✅ Add status to session

            }
            return session;
        }
    },

    session: {
        strategy: "jwt",
        maxAge: 3 * 24 * 60 * 60,
    },

    pages: {
        signIn: "/auth/login", // Default sign-in page
        error: "/auth/error" // Custom error page
    },

    trustHost: true,
    secret: process.env.AUTH_SECRET,
});