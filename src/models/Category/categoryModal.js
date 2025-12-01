// models/category.model.js
import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Each category name should be unique
        trim: true,
        lowercase: true, // Store names in lowercase for easier querying
    },
    description: {
        type: String,
        trim: true,
    },
    // Admins will create and manage these documents.
}, { timestamps: true }); // Adds createdAt and updatedAt fields automatically

export default model('Category', categorySchema);