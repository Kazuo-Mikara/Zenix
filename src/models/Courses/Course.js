import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    partner: {
        type: String,
        required: true,
        trim: true,
        // Examples: "Google", "IBM", "Meta", etc.
    },
    course: {
        type: String,
        required: true,
        trim: true,
        // Course title: "Google Cybersecurity"
    },
    skills: {
        type: [String], // Array of skills
        default: [],
        // Will handle parsing from string format like: "Network Security, Python Programming, Linux, Cloud Computing"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
        // Rating out of 5: 4.8
    },
    reviewcount: {
        type: String,
        trim: true,
        // Format like: "16.4k", "2.3k", "150"
    },
    level: {
        type: String,
        required: true,
        trim: true,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        // Note: Your data has "Beginner " with trailing space, we'll handle this
    },
    certificatetype: {
        type: String,
        trim: true,
        // Format like: "Professional Certificate", "Specialization", "Course"
    },
    duration: {
        type: String,
        trim: true,
        // Format like: "3 - 6 Months", "4 weeks", "Self-paced"
    },
    crediteligibility: {
        type: Boolean,
        default: false,
        // Whether the course is eligible for college credit
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt
    collection: 'course' // Explicitly specify your collection name
});

// Index for better query performance
CourseSchema.index({ partner: 1, level: 1 });
CourseSchema.index({ rating: -1 });
CourseSchema.index({ course: 'text' }); // Text search on course titles

// Virtual for formatted review count
CourseSchema.virtual('formattedReviewCount').get(function () {
    return this.reviewcount || '0';
});

// Method to parse skills from string format
CourseSchema.methods.parseSkills = function (skillsString) {
    if (typeof skillsString === 'string') {
        // Handle format like: "{" Network Security"," Python Programming"," Linux"," Cloud Computing"…"
        return skillsString.replace(/[{}"]/g, '').split(',').map(skill => skill.trim());
    }
    return [];
};

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);    