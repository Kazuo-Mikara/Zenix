import { NextResponse } from 'next/server'; // 1. Import NextResponse
import dbConnect from "@/lib/mongoose";
import courseModel from "@/models/Courses/courseModel";
export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { page, perPage, sortField, sortOrder } = body;
        const sortOptions = sortField
            ? { [sortField]: sortOrder === 'desc' ? -1 : 1 }
            : {}; // default DB order
        const courses = await courseModel.find()
            .sort(sortOptions)
            .skip((page - 1) * perPage)
            .limit(perPage)
            .lean();
        const courseCount = await courseModel.countDocuments();
        return NextResponse.json({ courses, courseCount }, { status: 201 });

    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch courses' }, { status: 500 });
    }
}
