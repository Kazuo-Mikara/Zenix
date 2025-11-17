import dbConnect from "@/lib/mongoose";
import CourseModel from "@/models/Courses/courseModel";
import { NextResponse } from 'next/server';

export async function DELETE(request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const courseId = searchParams.get('id');

        if (!courseId) {
            return NextResponse.json(
                { success: false, message: 'Course ID is required.' },
                { status: 400 }
            );
        }

        // First, check if the course exists
        const existingCourse = await CourseModel.findById(courseId);

        if (!existingCourse) {
            return NextResponse.json(
                { success: false, message: 'Course not found.' },
                { status: 404 }
            );
        }

        // Optional: Check if course can be deleted (e.g., no enrolled students)
        // const enrollmentCount = await EnrollmentModel.countDocuments({ courseId });
        // if (enrollmentCount > 0) {
        //     return NextResponse.json(
        //         { success: false, message: 'Cannot delete course with active enrollments.' },
        //         { status: 409 } // Conflict
        //     );
        // }

        // Perform the deletion
        const deleteResult = await CourseModel.deleteOne({ _id: courseId });

        if (deleteResult.deletedCount > 0) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'Course successfully deleted.',
                    data: {
                        courseId,
                        title: existingCourse.title,
                        deletedAt: new Date()
                    }
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { success: false, message: 'Failed to delete course.' },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('Delete error:', error);

        if (error.name === 'CastError') {
            return NextResponse.json(
                { success: false, message: 'Invalid course ID format.' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: 'Internal server error.' },
            { status: 500 }
        );
    }
}