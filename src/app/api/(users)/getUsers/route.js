import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { page, perPage, sortField, sortOrder } = body;
        if (page && perPage) {
            const sortOptions = sortField
                ? { [sortField]: sortOrder === 'desc' ? -1 : 1 }
                : {}; // default DB order


            const users = await User.find()
                .sort(sortOptions)
                .skip((page - 1) * perPage)
                .limit(perPage)
                .lean();
            const userCount = await User.countDocuments();
            console.log(users)
            return NextResponse.json({ users, userCount }, { status: 201 });
        }

        else if (getUsers) {
            const users = await User.find().sort({}).lean();
            const userCount = await User.countDocuments();
            return NextResponse.json({ users, userCount }, { status: 201 });
        }


    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch users' }, { status: 500 });
    }
}