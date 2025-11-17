import { NextResponse } from 'next/server'; // 1. Import NextResponse
import dbConnect from "@/lib/mongoose";
import courseModel from "@/models/Courses/courseModel";
export async function POST(req) {
    try {
        // 1. Ensure the database is connected
        await dbConnect();

        // 2. Use 'req' (the argument) to parse the JSON body
        const body = await req.json();
        const courseData = body;

        console.log("Received course data for saving:", courseData);

        // Create a new Mongoose document instance
        const newCourse = new courseModel(courseData);

        // Save the document to the MongoDB database
        await newCourse.save();

        // 3. Success response: 201 Created using NextResponse
        return NextResponse.json({
            success: true,
            data: newCourse,
            message: "Course successfully created."
        }, { status: 201 }); // Set the status code in the options object

    } catch (error) {
        // Handle Mongoose validation errors
        console.error("Mongoose save error:", error);

        // 4. Error response: 400 Bad Request using NextResponse
        return NextResponse.json({
            success: false,
            error: error.message,
            message: "Validation failed or data is invalid."
        }, { status: 400 }); // Use status: 400 for bad client data
    }
}


// export async function POST(req) {
//     try {
//         let body = req.json()
//         return NextResponse.json({
//             success: true,
//             data: body,
//             message: "Course successfully created."
//         }, { status: 201 });
//     }
//     catch (err) {
//         console.log('Error rises', err)
//     }
// }