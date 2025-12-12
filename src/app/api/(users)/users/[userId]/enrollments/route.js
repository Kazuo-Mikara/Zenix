// app/api/users/[userId]/enrollments/route.js
import { NextResponse } from 'next/server';
import { auth } from '@/auth/auth';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongoose';
import Users from '@/models/Users/User';
import CourseModel from '@/models/Courses/courseModel';
// import Course from '@/models/Courses/courseModel';

async function checkUserEnrollments(userId) {
    const user = await Users.findById(userId).select('enrolledCourses firstName lastName');
    return user;
}

async function getUserEnrollment(userId) {
    const user = await Users.findById(userId)
        .select('enrolledCourses firstName lastName')
        .populate({
            path: 'enrolledCourses.courseId',
            // We only need to select fields from the Course document. 
            // The 'modules' field is embedded, so we MUST include it in the select list.
            select: 'title description totalDurationMinutes lessonCount totalModules modules'
        });
    return user;

}

export async function GET(request, { params }) {
    try {
        // --- Authentication & Authorization Check ---
        const session = await auth();
        const { userId } = await params; // Get userId from URL parameter

        if (!session?.user) {
            return NextResponse.json(
                { success: false, message: 'Authentication required. Please log in.' },
                { status: 401 }
            );
        }

        const isAdmin = session.user.role === 'admin';
        const isOwner = session.user.id === userId;

        if (!isOwner && !isAdmin) {
            return NextResponse.json(
                { success: false, message: 'Forbidden. You are not authorized to view this user\'s enrollments.' },
                { status: 403 }
            );
        }
        await dbConnect();

        // --- Fetch User and Select Only Enrollments ---

        const user = await Users.findById(userId)
            .select('enrolledCourses firstName lastName')
            .populate({
                path: 'enrolledCourses.courseId',
                // We only need to select fields from the Course document. 
                // The 'modules' field is embedded, so we MUST include it in the select list.
                select: 'title description instructor totalDurationMinutes lessonCount totalModules modules'
            });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found.' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Enrollment list fetched successfully.',
            user: {
                id: user._id.toString(),
                firstName: user.firstName,
                lastName: user.lastName,
            },
            enrolledCourses: user.enrolledCourses || []
        }, { status: 200 });

    } catch (error) {
        console.error('API route error fetching enrollments:', error);

        let errorMessage = 'An internal server error occurred.';

        // --- SAFER ERROR HANDLING FOR MONGOOSE INSTANCEOF CHECK ---
        // Check if 'mongoose' is defined AND if 'mongoose.Error' is a constructor
        // before attempting the instanceof check.
        if (typeof mongoose !== 'undefined' && typeof mongoose.Error === 'function' && error instanceof mongoose.Error) {
            errorMessage = 'Database error occurred. Please try again later.';
            // Log the specific Mongoose error if available for debugging
            console.error('Mongoose specific error:', error.message);
            return NextResponse.json(
                { success: false, message: errorMessage },
                { status: 503 } // Service Unavailable
            );
        }
        // Handle other common error types if needed
        else if (error.name === 'CastError') {
            errorMessage = "Invalid ID format provided.";
        } else if (error.code === 11000) {
            errorMessage = "A record with this unique identifier already exists.";
        } else if (error.message && error.message.includes('ObjectId')) { // Fallback for ObjectId issues
            errorMessage = "An issue occurred with an ID. Please ensure all IDs are valid.";
        } else if (error.message) { // Use the error message if available
            errorMessage = error.message;
        }
        // --- END SAFER HANDLING ---

        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 500 }
        );
    }
}