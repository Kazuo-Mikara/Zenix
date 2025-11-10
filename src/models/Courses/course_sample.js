// models/course.model.js
const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    moduleId: { type: String, required: true }, // Or ObjectId if you have a separate Modules collection
    title: { type: String, required: true },
    lessonCount: { type: Number, required: true },
    durationMinutes: { type: Number, required: true }
});

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    modules: [moduleSchema], // Embedding modules within course
    totalModules: { type: Number, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
    tags: [{ type: String }],
}, { timestamps: true }); // Adds createdAt and updatedAt fields

module.exports = mongoose.model('Course', courseSchema);