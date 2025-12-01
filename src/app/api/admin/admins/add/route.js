import Admin from "@/models/Admin/Admin";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";

export async function POST(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { username, email, password } = body;

        // Validate required fields
        if (!username || !email || !password) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields: username, email, and password are required' },
                { status: 400 }
            );
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
            return NextResponse.json(
                { success: false, error: 'An admin with this email already exists' },
                { status: 409 }
            );
        }

        // Create new admin - password will be hashed by the pre-save middleware
        const admin = await Admin.create({
            userName: username,
            email: email.toLowerCase(),
            passwordHash: password, // The model's pre-save hook will hash this
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Admin registered successfully',
                admin: {
                    id: admin._id,
                    email: admin.email,
                    userName: admin.userName,
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error creating admin:', error);

        // Handle duplicate key errors
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'Email already exists' },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'Failed to create admin: ' + error.message },
            { status: 500 }
        );
    }
}