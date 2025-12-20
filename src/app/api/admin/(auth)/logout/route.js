
import { NextResponse } from 'next/server';

const isProduction = process.env.NODE_ENV === 'production';

export async function POST(request) {
    try {
        const response = NextResponse.json(
            { success: true, message: "Logged out successfully" },
            { status: 200 }
        );

        response.cookies.set('authToken', '', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'strict' : 'lax',
            maxAge: 0, // Expire immediately
            path: '/',
        });

        return response;
    } catch (error) {
        console.error("Logout Error:", error);
        return NextResponse.json({ success: false, error: 'Logout failed' }, { status: 500 });
    }
}
