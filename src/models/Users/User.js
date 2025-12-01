// models/user.model.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const enrollmentSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    enrollmentDate: { type: Date, default: Date.now },
    progress: {
        completedModules: { type: Number, default: 0 },
        totalModules: { type: Number, required: true }, // Total modules from the course
        percentage: { type: Number, default: 0 },
        lastAccessed: { type: Date, default: Date.now }
    },
    status: { type: String, enum: ['in-progress', 'finished', 'pending'], default: 'pending' },
    finishedDate: { type: Date } // Optional
}, { _id: false });

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['student', 'mentor', 'admin'], default: 'student' },
    gender: { type: String, enum: ['male', 'female', 'bisexual', 'prefer not to say'] },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Self-referencing for mentor
    enrolledCourses: [enrollmentSchema],
    sessionToken: { type: String },
    lastLogin: { type: Date, default: Date.now },
    loginAttempts: { type: Number, default: 0 }
}, { timestamps: true });

// --- Password Hashing Middleware ---
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) return next(); // Only hash if password changed
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
});

// --- Method to compare password ---
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
};

export default mongoose.models.Users || mongoose.model('Users', userSchema);