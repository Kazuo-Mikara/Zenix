import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Courses from '@/models/Courses/courseModel';
import SkillShare from "../../../../models/Courses/SkillShare";

// Assuming these are imported or defined
// import Coursera from "../../../../models/Courses/Coursera";
// import edX from "../../../../models/Courses/edX";

const CoursePlatformHandler = (coursePlatform) => {
    switch (coursePlatform) {
        case 'Udemy':
            return SkillShare;
        case 'Coursera':
            // return Coursera;
            return SkillShare;
        case 'edX':
            // return edX;
            return SkillShare;
        case 'Skillshare':
            return SkillShare;
        case 'Zenix':
            return Courses;
        default:
            return Courses;
    }
}

export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const {
            page,
            perPage,
            coursePlatform,
            difficulty,
            getCourses,
            sortField,
            sortOrder
        } = body;

        const CourseModel = CoursePlatformHandler(coursePlatform);
        if (page && perPage && coursePlatform) {
            const query = {};
            if (difficulty && difficulty !== 'Default') {
                query.difficulty = difficulty;
            }
            const sortOptions = sortField
                ? { [sortField]: sortOrder === 'desc' ? -1 : 1 }
                : { _id: -1 };
            const courses = await CourseModel.find(query)
                .sort(sortOptions)
                .skip((page - 1) * perPage)
                .limit(perPage)
                .lean();
            const courseCount = await CourseModel.countDocuments(query);

            return NextResponse.json({
                courses,
                courseCount,
                page: parseInt(page),
                totalPages: Math.ceil(courseCount / perPage)
            }, { status: 200 });
        }

        else if (getCourses) {
            const courses = await CourseModel.find().sort({ title: 1 }).lean();
            const courseCount = await CourseModel.countDocuments();
            return NextResponse.json({ courses, courseCount }, { status: 200 });
        }

        return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });

    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch courses', error: error.message }, { status: 500 });
    }
}