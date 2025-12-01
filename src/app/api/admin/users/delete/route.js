import dbConnect from "@/lib/mongoose";
import Users from "@/models/Users/User";
import { NextResponse } from 'next/server';

export async function DELETE(request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('id');
        console.log(userId);
        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'User ID is required.' },
                { status: 400 }
            );
        }

        // First, check if the User exists
        const existingUser = await Users.findById(userId);

        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: 'User not found.' },
                { status: 404 }
            );
        }
        // Perform the deletion
        const deleteResult = await Users.deleteOne({ _id: userId });

        if (deleteResult.deletedCount > 0) {
            return NextResponse.json(
                {
                    success: true,
                    message: 'User successfully deleted.',
                    data: {
                        userId,
                        title: existingUser.title,
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