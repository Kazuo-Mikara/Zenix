import { NextResponse } from 'next/server'; // 1. Import NextResponse
import dbConnect from "@/lib/mongoose";
import courseModel from "@/models/Courses/courseModel";
export async function POST(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { courseId } = body;
        const courseById = await courseModel.findById(courseId).lean();
        return NextResponse.json({ courseById }, { status: 201 });

    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch course' }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await dbConnect();
        const body = await request.json();
        const { courseId, ...updateData } = body;

        if (!courseId) {
            return NextResponse.json({ message: 'Course ID is required' }, { status: 400 });
        }

        const updatedCourse = await courseModel.findByIdAndUpdate(
            courseId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return NextResponse.json({ message: 'Course not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Course updated successfully', course: updatedCourse }, { status: 200 });

    } catch (error) {
        console.error('Database Error:', error);
        if (error.name === 'ValidationError') {
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            return NextResponse.json({ message: 'Validation failed', errors }, { status: 400 });
        }
        return NextResponse.json({ message: 'Failed to update course' }, { status: 500 });
    }
}
