import { hashPassword } from "@/utils/password_hash";
import dbConnect from "../../../../lib/mongoose";
import User from "../../../../models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        // log the incoming body for debugging (remove or reduce in production)
        console.log("[POST /api/register] body:", body);

        const { name, email, password } = body || {};

        if (!email || !password) {
            return NextResponse.json({ error: "email and password are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
        }

        const hashedPassword = await hashPassword(password);
        // construct with an object so fields map correctly to schema
        const userDoc = new User({ name, email, password: hashedPassword });
        await userDoc.save();

        // convert to plain object and remove sensitive fields before returning
        const result = userDoc.toObject ? userDoc.toObject() : userDoc;
        if (result.password) delete result.password;

        return NextResponse.json(
            {
                message: 'User registered successfully',
                userId: userDoc._id,
                email: userDoc.email,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("[POST /api/register] error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}
