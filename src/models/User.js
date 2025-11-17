import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    createdAt: { type: Date, default: Date.now },
    gender: { type: String, default: 'male' }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User;


// enrolledCourses: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'SkillShare'
//     }