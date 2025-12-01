import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Users from "@/models/Users/User"; // Assuming your model is named 'Users'

export async function GET() {
    try {
        await dbConnect();

        const userTimeline = await Users.find({}) 
            .sort({ createdAt: -1 }) 
            .limit(5)                 
            .select('firstName lastName email createdAt role') 
            .lean();         

      
        return NextResponse.json({ userTimeline }, { status: 200 });

    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch recently created users' }, { status: 500 });
    }
}