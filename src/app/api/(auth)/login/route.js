import dbConnect from '../../../../lib/mongoose';
import User from '../../../../models/User';
import { verifyPassword } from '@/utils/password_hash';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**a
 * Handles POST requests for user sign-in/login, generates a JWT,
 * and sets it as a secure HTTP-only cookie.
 * Path: /api/auth/signin
 */
export async function POST(request) {
    try {
        // 1. Get Secret and Connect
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            console.error('JWT_SECRET is not defined!');
            return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
        }

        await dbConnect();

        const { email, password } = await request.json();
        // const { email, password } = await userInfo

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // 2. Find the user (need the password hash to verify)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            // Use generic error message for security
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // 3. Verify the password
        const isPasswordValid = await verifyPassword(password, user.password);

        if (!isPasswordValid) {
            // Use generic error message for security
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // --- JWT GENERATION AND SESSION MANAGEMENT ---

        // 4. Generate JWT
        const tokenPayload = {
            userId: user._id.toString(), // Convert ObjectId to string
            email: user.email
        };
        const tokenOptions = { expiresIn: '1h' }; // Token expires in 1 hour

        const token = jwt.sign(tokenPayload, JWT_SECRET, tokenOptions);

        // 5. Save the token to the user document in MongoDB
        // This tracks the current session token on the server side.
        await User.updateOne(
            { _id: user._id },
            { $set: { sessionToken: token } }
        );

        // 6. Create success response object
        const response = NextResponse.json(
            {
                message: 'Sign-in successful',
                userId: user._id,
                email: user.email,
                name: user.name
                // The token is sent via cookie, not in the body, for security
            },
            { status: 200 }
        );

        // 7. Set the JWT in a secure HTTP-only cookie
        response.cookies.set('authToken', token, {
            httpOnly: true, // Crucial: Prevents client-side JS access (XSS defense)
            secure: false, // Set to false for development to ensure cookie is sent
            sameSite: 'lax', // More permissive for development
            maxAge: 60 * 60 * 1, // 1 hour (matches token expiration)
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Sign-in error:', error);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }

}
