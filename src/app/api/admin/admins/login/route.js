// app/api/login/route.js
import dbConnect from '@/lib/mongoose';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Admin from '@/models/Admin/Admin';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '3d';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 3;
const isProduction = process.env.NODE_ENV === 'production';

export async function POST(request) {
    try {
        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not defined!');
            return NextResponse.json(
                { success: false, error: 'Server configuration error: JWT_SECRET missing.' },
                { status: 500 }
            );
        }

        await dbConnect();

        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const admin = await Admin.findOne({ email: email.toLowerCase() });

        let isPasswordValid = false;
        if (admin) {
            isPasswordValid = await admin.comparePassword(password);
        }

        if (!admin || !isPasswordValid) {
            return NextResponse.json(
                { success: false, error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        if (admin.status && (admin.status === 'inactive' || admin.status === 'banned')) {
            return NextResponse.json(
                { success: false, error: 'Your account is not active. Please contact support.' },
                { status: 403 }
            );
        }

        const tokenPayload = {
            userId: admin._id.toString(),
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            role: admin.role || 'user',
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        await Admin.updateOne(
            { _id: admin._id },
            {
                $set: {
                    sessionToken: token,
                    lastLogin: new Date(),
                    loginAttempts: 0
                }
            }
        );

        const userDataForClient = {
            userId: admin._id.toString(),
            email: admin.email,
            firstName: admin.firstName,
            lastName: admin.lastName,
            role: admin.role || 'user',
        };

        const response = NextResponse.json(
            {
                success: true,
                message: 'Sign-in successful',
                user: userDataForClient,
            },
            { status: 200 }
        );

        response.cookies.set('authToken', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: COOKIE_MAX_AGE_SECONDS,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Sign-in API error:', error);

        if (error.name === 'MongoError' || error.name === 'MongooseError') {
            return NextResponse.json(
                { success: false, error: 'Database connection error. Please try again later.' },
                { status: 500 }
            );
        }

        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json(
                { success: false, error: 'Error generating authentication token.' },
                { status: 500 }
            );
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return NextResponse.json(
                { success: false, error: `Validation failed: ${messages.join(', ')}` },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'An unexpected error occurred during login.' },
            { status: 500 }
        );
    }
}