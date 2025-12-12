// app/api/users/[userId]/enroll/route.js
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { auth } from '@/auth/auth'; // Import auth for authentication
import dbConnect from '@/lib/mongoose'; // Your MongoDB connection utility
import Users from '@/models/Users/User';// Adjust path as per your project structure
import courseModel from '@/models/Courses/courseModel';
/**
 * Adds an enrollment to a student's account.
 * 
 * @param {string} userId - The MongoDB ObjectId of the student user.
 * @param {string} courseId - The MongoDB ObjectId of the course to enroll in.
 * @param {number} totalModules - The total number of modules in the course.
 * @returns {Promise<object>} - A promise resolving to an object indicating success or failure.
 */
export async function addEnrollmentToStudent(userId, courseId, totalModules) {
    try {
        await dbConnect();

        // Validate ObjectId formats
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return {
                success: false,
                message: "Invalid userId format."
            };
        }
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return {
                success: false,
                message: "Invalid courseId format."
            };
        }

        // --- ADDED: Check if the course exists ---
        const course = await courseModel.findById(courseId);
        if (!course) {
            return {
                success: false,
                message: "Course not found."
            };
        }
        // --- End of addition ---

        // Find the user by userId
        const student = await Users.findById(userId);

        if (!student) {
            return {
                success: false,
                message: "Student not found."
            };
        }

        // Prevent duplicate enrollment
        const isAlreadyEnrolled = student.enrolledCourses.some(enrollment =>
            enrollment.courseId.toString() === courseId
        );
        const isStudent = student.role === 'student';
        if (!isStudent) {
            return {
                success: false,
                message: "Only students can enroll in courses."
            };
        }
        if (isAlreadyEnrolled) {
            return {
                success: false,
                message: "Student is already enrolled in this course."
            };
        }

        // Create a new enrollment object
        const newEnrollment = {
            courseId: new mongoose.Types.ObjectId(courseId), // Already validated ObjectId format
            progress: {
                totalModules: totalModules,
            }
            // totalModules is validated in the API route, but it's good it's here too
            // Other fields (enrollmentDate, status, progress) will use defaults
        };

        // Add the new enrollment to the enrolledCourses array
        student.enrolledCourses.push(newEnrollment);

        // Save the updated student document
        await student.save();

        return {
            success: true,
            message: "Enrollment added successfully.",
            data: {
                studentId: userId,
                courseId: courseId,
                enrollment: newEnrollment
            }
        };

    } catch (error) {
        console.error("Error adding enrollment in service:", error);
        // More specific error for DB issues
        if (error instanceof mongoose.Error) {
            return {
                success: false,
                message: "Database error occurred. Please try again later."
            };
        }
        return {
            success: false,
            message: `An unexpected error occurred: ${error.message}`
        };
    }
}

export async function POST(request, { params }) {
    try {
        // --- Authentication Check ---
        // Decide who can enroll students. Here, we assume an 'admin' or 'instructor' role.
        // You might need to adjust this based on your user roles and authentication setup.
        // const session = await auth();
        // if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'instructor')) {
        //     return NextResponse.json(
        //         { success: false, message: 'Unauthorized. Only admins or instructors can enroll students.' },
        //         { status: 401 }
        //     );
        // }

        const { userId } = await params; // Get userId from URL parameter

        // --- Get Request Body ---
        const body = await request.json();
        const { courseId, totalModules } = body;

        // --- Basic Input Validation ---
        if (!courseId || !totalModules || typeof totalModules !== 'number' || totalModules <= 0) {
            return NextResponse.json(
                { success: false, message: 'Missing or invalid required fields: courseId, totalModules.' },
                { status: 400 }
            );
        }

        // --- Call the Service Function ---
        const result = await addEnrollmentToStudent(userId, courseId, totalModules);

        // --- Respond ---
        if (result.success) {
            return NextResponse.json({
                success: true,
                message: result.message,
                data: result.data
            }, { status: 200 });
        } else {
            // Handle specific errors from the service function
            return NextResponse.json({
                success: false,
                message: result.message
            }, { status: result.message.includes('not found') ? 404 : 400 });
        }

    } catch (error) {
        console.error('API route error for enrollment:', error);
        return NextResponse.json(
            { success: false, message: 'An internal server error occurred.' },
            { status: 500 }
        );
    }
}