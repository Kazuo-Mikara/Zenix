


import mongoose from 'mongoose';

const { Schema } = mongoose;

// --- 1. Detailed Duration Sub-Schema ---
// Matches the 'detailedDuration' object inside each module
const DetailedDurationSchema = new Schema({
    weeks: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    days: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    hours: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    minutes: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
}, { _id: false }); // We don't need a separate ID for this embedded document

// --- 2. Module Sub-Schema ---
// Matches the structure of 'processedModules'
const ModuleSchema = new Schema({
    // Unique identifier for use in the frontend/client
    moduleId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: [true, 'Module title is required.'],
        trim: true,
        maxlength: [120, 'Module title cannot exceed 120 characters.']
    },
    lessonCount: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    // Denormalized field for easy sorting/filtering in DB queries
    moduleDurationMinutes: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        index: true
    },
    detailedDuration: {
        type: DetailedDurationSchema,
        required: true
    },
    // Placeholder for when lessons are added later
    lessons: {
        type: [Object],
        default: []
    }
}, { _id: false }); // Use a main course ID, not module ID for MongoDB indexing

// --- 3. Main Course Schema ---
const CourseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Course title is required.'],
        unique: true,
        trim: true,
        maxlength: [200, 'Course title cannot exceed 200 characters.']
    },
    description: {
        type: String,
        required: [true, 'Course description is required.'],
        maxlength: [1500, 'Course description cannot exceed 1500 characters.']
    },
    instructor: {
        type: String,
        required: [true, 'Instructor name is required.'],
        trim: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: {
            values: ['Beginner', 'Intermediate', 'Advanced'],
            message: 'Difficulty must be Beginner, Intermediate, or Advanced.'
        },
        default: 'Beginner'
    },
    tags: {
        type: [String],
        default: [],
        index: true // Index for quick tag lookups
    },
    totalModules: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    // Denormalized field for easy sorting/filtering of the entire course duration
    totalDurationMinutes: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        index: true
    },
    modules: {
        type: [ModuleSchema],
        default: []
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true, 
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true,
    },
}, { timestamps: true });

// Prevent Mongoose from compiling the model multiple times in Next.js environment
const courseModel = mongoose.models.Courses || mongoose.model('Courses', CourseSchema);

export default courseModel;