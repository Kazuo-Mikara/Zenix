'use server'

import dbConnect from "@/lib/mongoose";
import Users from "@/models/Users/User";
import Admin from "@/models/Admin/Admin";


export async function loginUser(provider, email, password) {
    try {
        await dbConnect();

        let user;
        let Model;

        // Determine which model to use
        if (provider === 'admin') {
            Model = Admin;
        } else if (provider == 'portal') {
            Model = Users;
        }



        // Find user first to check status
        user = await Model.findOne({ email: email.toLowerCase() });

        if (!user) {
            return {
                success: false,
                error: "Invalid email or password. Please Try again."
            };
        }

        // Check password
        const isValid = await user.comparePassword(password);
        if (!isValid) {
            return {
                success: false,
                error: "Invalid email or password. Please Try again."
            };
        }

        if (provider === 'student' && user.role !== 'student') {
            return {
                success: false,
                error: "Access denied. Please use the correct login portal."
            };
        }



        if (provider === 'instructor' && user.role !== 'mentor') {
            return {
                success: false,
                error: "Access denied. This portal is for instructors only."
            };
        }


        if (user.role == 'admin') {
            return {
                success: false,
                error: "You tried to login with admin account. Please use correct login portal."
            };
        }

        if (user.status === 'inactive') {
            return {
                success: false,
                error: "Your account is inactive. Please contact support."
            };
        }

        if (user.status === 'banned') {
            return {
                success: false,
                error: "Your account has been banned. Please contact support."
            };
        }


        return {
            success: true,
            message: "Login successful"
        };

    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            error: "An unexpected error occurred. Please try again."
        };
    }
}