
import dbConnect from '@/lib/mongoose';
import Admin from '@/models/Admin/Admin';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '3d';
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 3;
const isProduction = process.env.NODE_ENV === 'production';

export async function POST(request) {
    try {
        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not defined!');
            return NextResponse.json({ success: false, error: 'Server configuration error.' }, { status: 500 });
        }

        await dbConnect();
        const body = await request.json();
        const { username, email, password } = body;

        if (!username || !email || !password) {
            return NextResponse.json({ success: false, error: 'All fields (username, email, password) are required' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ success: false, error: 'Invalid email format' }, { status: 400 });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
        if (existingAdmin) {
            return NextResponse.json({ success: false, error: 'Admin with this email already exists' }, { status: 400 });
        }

        // Create new admin
        // Note: Password hashing is handled by the pre-save hook in the Admin model
        const newAdmin = new Admin({
            username,
            email,
            passwordHash: password,
            role: 'admin',
            status: 'active'
        });

        await newAdmin.save();

        // Generate JWT Token
        const tokenPayload = {
            userId: newAdmin._id.toString(),
            username: newAdmin.username,
            email: newAdmin.email,
            role: newAdmin.role
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

        // Update session token
        newAdmin.sessionToken = token;
        await newAdmin.save();

        const userData = {
            userId: newAdmin._id.toString(),
            username: newAdmin.username,
            email: newAdmin.email,
            role: newAdmin.role
        };

        const response = NextResponse.json(
            { success: true, message: 'Registration successful', user: userData },
            { status: 201 }
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
        console.error("Register Error:", error);
        return NextResponse.json({ success: false, error: 'Registration failed: ' + error.message }, { status: 500 });
    }
}
