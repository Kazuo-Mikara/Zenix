import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Users from '@/models/Users/User';
/**
 * Handles GET requests to retrieve a single user by ID.
 * Path: /api/getOneUser?userId=<ID>
 */
export async function GET(request, { params }) {
    // 1. Extract userId from path parameters and coursePlatform from query parameters
    const { userId } = await params;
    // const coursePlatform = request.nextUrl.searchParams.get('coursePlatform');
    if (!userId) {
        return NextResponse.json({ message: 'Missing userId parameter' }, { status: 400 });
    }

    try {
        await dbConnect();

        // 2. Fetch the course using Mongoose
        const user = await Users.findById(userId);

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // 3. Return the found course with the correct status for a successful GET request (200 OK)
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);

        // Handle specific Mongoose error if ID format is invalid
        if (error.name === 'CastError') {
            return NextResponse.json({ message: 'Invalid user ID format' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Failed to fetch user' }, { status: 500 });
    }
}