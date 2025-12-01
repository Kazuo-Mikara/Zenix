import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose'; // Assuming you have a connection utility
import Users from '@/models/Users/User';
import CourseModal from '@/models/Courses/courseModel';


export async function GET() {
    // 1. Ensure Database Connection is Ready
    try {
        await dbConnect();
    } catch (error) {
        return NextResponse.json({ message: 'Database connection error' }, { status: 500 });
    }

    try {
        // 2. Run all counting queries in parallel using Promise.all
        const [
            studentCount,
            userCount,
            courseCount,
            instructorCount,
            // You can add more count promises here, e.g., reviewCountPromise
        ] = await Promise.all([
            // Students: Count users with 'student' role
            Users.countDocuments({ role: 'student' }),

            // All Users: Total user count
            Users.countDocuments({}),

            // Courses: Total course count
            CourseModal.countDocuments({}),

            // Instructors: Count users with 'mentor' role
            Users.countDocuments({ role: 'mentor' }),

            // Placeholder for other counts if models are not imported yet:
            // Review.countDocuments({})
        ]);

        // 3. Aggregate data for a complex count (e.g., total enrollments across all users)
        const enrollmentAggregation = await Users.aggregate([
            { $unwind: "$enrolledCourses" },
            { $count: "totalEnrollments" }
        ]);
        const enrollmentCount = enrollmentAggregation.length > 0 ? enrollmentAggregation[0].totalEnrollments : 0;


        // 4. Return consolidated data
        const stats = {
            students: studentCount,
            users: userCount,
            courses: courseCount,
            instructors: instructorCount,
            reviews: 0, // Mock/Placeholder
            invoices: 0, // Mock/Placeholder
            categories: 0, // Mock/Placeholder
            enrollments: enrollmentCount,
        };

        return NextResponse.json(stats, { status: 200 });

    } catch (error) {
        console.error('Error fetching dashboard statistics:', error);
        return NextResponse.json({ message: 'Failed to retrieve statistics', error: error.message }, { status: 500 });
    }
}