import { cookies } from "next/headers";
import { NextResponse } from 'next/server'
export async function POST() {
    const cookieStore = await cookies()
    const authToken = cookieStore.get('authToken')
    try {
        cookieStore.delete(authToken);
        return NextResponse.json(
            { message: 'Logout successful' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        );
    }
}