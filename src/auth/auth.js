import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "../lib/mongoose";
import Users from "@/models/Users/User";
import Admin from "@/models/Admin/Admin";
import Google from "next-auth/providers/google";
import mongoose from "mongoose";
import { hashPassword } from "@/utils/password_hash";
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    response_type: "code",
                },
            },
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
                        gender: user.gender,
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

        async signIn({ account, profile }) {
            // Only handle Google here
            if (account?.provider !== "google") return true;

            const email = profile?.email?.toLowerCase();
            if (!email) return false;

            await dbConnect();

            const fullName = profile?.name || "";
            const [firstName = "", ...rest] = fullName.trim().split(" ");
            const lastName = rest.join(" ");

            // Google unique id is usually in profile.sub
            const googleId = profile?.sub;
            const password = await hashPassword(googleId);

            await Users.findOneAndUpdate(
                { email }, // link by email to avoid duplicates
                {
                    $setOnInsert: {
                        email,
                        role: "student",
                        status: "active",
                        plan: "free",
                        loginAttempts: 0,
                    },
                    $set: {
                        firstName,
                        lastName,
                        avatarUrl: profile?.picture, // Google usually provides picture
                        lastLogin: new Date(),
                        passwordHash: password,
                    },
                },
                { upsert: true, new: true }
            );

            return true;
        },
        async jwt({ token, user, account, profile, trigger }) {
            // 1) Credentials login: user.id already your Mongo _id string
            if (user?.id && mongoose.Types.ObjectId.isValid(user.id)) {
                token.uid = user.id;
                token.role = user.role;
                token.userName = user.userName;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.gender = user.gender;
                token.status = user.status;
            }

            // 2) Google login (first time jwt runs after OAuth)
            if (account?.provider === "google") {
                const email = (profile?.email || token.email || "").toLowerCase();
                if (email) {
                    await dbConnect();
                    const dbUser = await Users.findOne({ email });
                    if (dbUser) {
                        token.uid = dbUser._id.toString();
                        token.role = dbUser.role;
                        token.userName = dbUser.userName;
                        token.firstName = dbUser.firstName;
                        token.lastName = dbUser.lastName;
                        token.gender = dbUser.gender;
                        token.status = dbUser.status;
                    }
                }
            }

            // 3) Your status refresh logic must use token.uid (Mongo id), not token.id
            if (trigger === "update" && token.uid && mongoose.Types.ObjectId.isValid(token.uid)) {
                await dbConnect();
                const dbUser = await Users.findById(token.uid).select("status");
                if (dbUser) token.status = dbUser.status;
            }

            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user.id = token.uid;
                session.user.role = token.role;
                session.user.userName = token.userName;
                session.user.firstName = token.firstName;
                session.user.lastName = token.lastName;
                session.user.gender = token.gender;
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