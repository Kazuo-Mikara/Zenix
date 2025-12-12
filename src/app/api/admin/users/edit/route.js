import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose'; // Adjust path as needed
import Users from '@/models/Users/User';
import bcrypt from 'bcryptjs';

export async function PUT(request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { userId } = body; // Get userId from request body

        console.log('Updating user:', userId);
        console.log('Update data:', body);

        // Validate userId
        if (!userId || userId.length !== 24) {
            return NextResponse.json(
                { success: false, message: 'Invalid user ID' },
                { status: 400 }
            );
        }

        // Find user
        const user = await Users.findById(userId);
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Prepare update object
        const updateData = {
            firstName: body.firstName,
            lastName: body.lastName,
            role: body.role,
            gender: body.gender,
            status: body.status,
            plan: body.plan,
        };

        // Only include mentorId if provided
        if (body.mentorId) {
            updateData.mentorId = body.mentorId;
        } else {
            updateData.mentorId = null;
        }

        // Handle password change
        if (body.newPassword && body.newPassword.trim()) {
            const salt = await bcrypt.genSalt(10);
            updateData.passwordHash = await bcrypt.hash(body.newPassword, salt);
            console.log('Password will be updated');
        }

        console.log('Final update data:', updateData);

        // Update user - use findByIdAndUpdate to bypass pre-save hook
        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { $set: updateData },
            {
                new: true, // Return updated document
                runValidators: true // Run schema validators
            }
        ).select('-passwordHash'); // Don't return password hash

        console.log('Updated user:', updatedUser);

        return NextResponse.json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser
        });

    } catch (error) {
        console.error('Update user error:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const errors = {};
            Object.keys(error.errors).forEach(key => {
                errors[key] = error.errors[key].message;
            });
            return NextResponse.json(
                { success: false, message: 'Validation failed', errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update user' },
            { status: 500 }
        );
    }
}