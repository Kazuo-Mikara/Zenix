import Users from "@/models/Users/User";
import dbConnect from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const formData = await req.json();
        await dbConnect();
        const { firstName, lastName, gender, email, passwordHash, role } = formData;
        if (!firstName || !lastName || !email || !passwordHash || !role || !gender) {
            return NextResponse.json({
                success: false,
                message: "Missing required fields",
                errors: {
                    firstName: !firstName ? "First name is required" : null,
                    lastName: !lastName ? "Last name is required" : null,
                    email: !email ? "Email is required" : null,
                    passwordHash: !passwordHash ? "Password is required" : null,
                    gender: !gender ? "Gender is required" : null,
                    role: !role ? "Role is required" : null,
                }
            }, { status: 400 });
        }


        const existingUser = await Users.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: "User with this email already exists",
                errors: { email: "Email already registered" }
            }, { status: 409 });
        }

        if (formData.mentorId) {
            const mentorExists = await Users.findById(formData.mentorId);
            if (!mentorExists) {
                return NextResponse.json({
                    success: false,
                    message: "Invalid mentor ID",
                    errors: { mentorId: "Mentor not found" }
                }, { status: 400 });
            }
        }

        const newUser = new Users(formData);
        await newUser.save();

        const userResponse = newUser.toObject();
        delete userResponse.passwordHash;
        return NextResponse.json({
            success: true,
            data: userResponse,
            message: "User successfully created."
        }, { status: 201 });

    } catch (error) {
        console.error('User creation error:', error);

        if (error.name === 'ValidationError') {
            const validationErrors = {};
            Object.keys(error.errors).forEach(key => {
                validationErrors[key] = error.errors[key].message;
            });

            return NextResponse.json({
                success: false,
                message: "Validation failed",
                errors: validationErrors
            }, { status: 400 });
        }

        if (error.code === 11000) {
            return NextResponse.json({
                success: false,
                message: "User with this email already exists",
                errors: { email: "Email already registered" }
            }, { status: 409 });
        }
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
        }, { status: 500 });
    }
}