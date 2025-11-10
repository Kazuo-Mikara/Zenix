import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/mongoose";
// import Course from '../../../../models/Courses/Course';
import SkillShare from "../../../../models/Courses/SkillShare";
/**
 * Handles GET requests to retrieve a single course by ID.
 * Path: /api/getOneCourse?courseId=<ID>
 */
export async function GET(request) {
    // 1. Correctly parse and access the 'courseId' query parameter
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId'); // Use .get() method

    if (!courseId) {
        return NextResponse.json({ message: 'Missing courseId parameter' }, { status: 400 });
    }

    try {
        await dbConnect();

        // 2. Fetch the course using Mongoose
        const course = await SkillShare.findById(courseId);

        if (!course) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        }

        // 3. Return the found course with the correct status for a successful GET request (200 OK)
        return NextResponse.json(course, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);

        // Handle specific Mongoose error if ID format is invalid
        if (error.name === 'CastError') {
            return NextResponse.json({ message: 'Invalid course ID format' }, { status: 400 });
        }

        return NextResponse.json({ message: 'Failed to fetch course' }, { status: 500 });
    }
}