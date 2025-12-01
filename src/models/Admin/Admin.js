// models/admin.model.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // For password hashing

const adminSchema = new mongoose.Schema({
    userName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
    passwordHash: { type: String, required: true },
    lastLogin: { type: Date, default: Date.now },
    loginAttempts: { type: Number, default: 0 }
}, { timestamps: true });

// --- Password Hashing Middleware ---
// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) return next(); // Only hash if password changed
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
});

// --- Method to compare password ---
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.passwordHash);
};

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);