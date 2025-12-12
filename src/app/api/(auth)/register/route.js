import Users from "@/models/Users/User";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { firstName, lastName, email, password } = body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: firstName, lastName, email, and password are required' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await Users.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'An user with this email already exists' },
                { status: 409 }
            );
        }

        // Create new user - password will be hashed by the pre-save middleware
        const user = await Users.create({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            passwordHash: password, // The model's pre-save hook will hash this
        });

        return NextResponse.json(
            {
                success: true,
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating user:', error);

        // Handle duplicate key errors
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'Email already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create user: ' + error.message },
            { status: 500 }
        );
    }
}