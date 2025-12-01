import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Users from "@/models/Users/User";

export async function GET() {
    try {
        await dbConnect();
        const maleUsers = await Users.find({ gender: "male" }).countDocuments();
        const femaleUsers = await Users.find({ gender: "female" }).countDocuments();
        const userCount = await Users.countDocuments();
        return NextResponse.json({ maleUsers, femaleUsers, userCount }, { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
    }
}