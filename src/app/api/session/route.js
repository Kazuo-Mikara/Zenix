import dbConnect from '../../../lib/mongoose';
import User from '../../../models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * GET /api/session
 * Checks the current user session based on the authToken cookie
 */
export async function GET(request) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not defined!');
            return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
        }

        await dbConnect();

        // Get the authToken from cookies
        const cookieHeader = request.headers.get('cookie');
        console.log('Cookie header received:', cookieHeader);

        if (!cookieHeader) {
            console.log('No cookie header found');
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const cookies = Object.fromEntries(
            cookieHeader.split(';').map(c => c.trim().split('='))
        );

        console.log('Parsed cookies:', cookies);
        const token = cookies.authToken;
        console.log('Auth token found:', token);

        if (!token) {
            console.log('No authToken found in cookies');
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Verify the JWT token
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (error) {
            console.log('Token verification failed:', error);
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Find the user in the database
        const user = await User.findById(decoded.userId).select('-password -sessionToken');

        if (!user) {
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Return the user data
        const userData = {
            userId: user._id.toString(),
            email: user.email,
            name: user.name
        };

        return NextResponse.json({ user: userData }, { status: 200 });

    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json({ user: null }, { status: 200 });
    }
}