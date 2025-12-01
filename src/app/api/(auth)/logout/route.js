// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

const isProduction = process.env.NODE_ENV === 'production';

export async function POST(request) {
    try {
        const response = NextResponse.json(
            { success: true, message: "Logout successful" },
            { status: 200 }
        );

        // Clear authToken cookie by setting maxAge to 0
        response.cookies.set('authToken', '', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 0,
            path: '/',
        });

        // Clear userInfo cookie (legacy, may not exist)
        response.cookies.set('userInfo', '', {
            httpOnly: false,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 0,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { success: false, error: "Logout failed" },
            { status: 500 }
        );
    }
}