import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
// import Course from '../../../../models/Courses/Course';
import SkillShare from "../../../../models/Courses/SkillShare";
const CoursePlatformHandler = (coursePlatform) => {
    switch (coursePlatform) {
        case 'Udemy':
            return SkillShare;
        case 'Coursera':
            return Coursera;
        case 'edX':
            return edX;
        case 'Skillshare':
            return SkillShare;
        default:
            return SkillShare;
    }
}
export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { page, perPage, coursePlatform, getCourses, sortField, sortOrder } = body;
        if (page && perPage && coursePlatform) {
            const sortOptions = sortField
                ? { [sortField]: sortOrder === 'desc' ? -1 : 1 }
                : {}; // default DB order

            const CourseModel = CoursePlatformHandler(coursePlatform);
            const courses = await CourseModel.find()
                .sort(sortOptions)
                .skip((page - 1) * perPage)
                .limit(perPage)
                .lean();
            const courseCount = await CourseModel.countDocuments();
            return NextResponse.json({ courses, courseCount }, { status: 201 });
        }

        else if (getCourses) {
            const courses = await CourseModel.find().sort({}).lean();
            const courseCount = await CourseModel.countDocuments();
            return NextResponse.json({ courses, courseCount }, { status: 201 });
        }


    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch courses' }, { status: 500 });
    }
}