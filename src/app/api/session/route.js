import dbConnect from '../../../lib/mongoose';
import Admin from '@/models/Admin/Admin';
import Users from '@/models/Users/User';
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

        const token = request.cookies.get('authToken')?.value;
        // console.log('Auth token found:', token ? 'Yes' : 'No');

        if (!token) {
            // console.log('No authToken found in cookies');
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Verify the JWT token
        // Verify the JWT token
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
            // console.log('Decoded Token:', decoded);
        } catch (error) {
            console.log('Token verification failed:', error.message);
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Find the user in the database based on role
        let user = null;
        try {
            if (decoded.role === 'admin' || decoded.role === 'super_admin') {
                user = await Admin.findById(decoded.userId).select('-passwordHash -password -sessionToken');
            } else {
                user = await Users.findById(decoded.userId).select('-password -sessionToken');
            }
        } catch (dbError) {
            console.error('Database lookup error:', dbError);
        }

        if (!user) {
            console.log('User not found in DB for ID:', decoded.userId, 'Role:', decoded.role);
            return NextResponse.json({ user: null }, { status: 200 });
        }

        // Return the user data
        const userData = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role || 'user',
            ...(user.username && { username: user.username }),
            ...(user.firstName && { firstName: user.firstName }),
            ...(user.lastName && { lastName: user.lastName }),
        };

        return NextResponse.json({ user: userData }, { status: 200 });

    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json({ user: null }, { status: 200 });
    }
}