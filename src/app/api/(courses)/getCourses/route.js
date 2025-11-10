import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
// import Course from '../../../../models/Courses/Course';
import SkillShare from "../../../../models/Courses/SkillShare";

export async function POST(request) {
    try {
        await dbConnect();
        const { page, perPage } = await request.json();
        const courses = await SkillShare.find().sort({ duration: -1 }).skip((page - 1) * perPage).limit(perPage).lean();
        const courseCount = await SkillShare.countDocuments();
        return NextResponse.json({ courses, courseCount }, { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch courses' }, { status: 500 });
    }
}