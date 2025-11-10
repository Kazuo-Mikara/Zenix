import mongoose from "mongoose";

const courseWithDescriptionSchema = new mongoose.Schema({
    year: { type: String, required: true },
    term: { type: String, required: true },
    yearTerm: { type: String, required: true },
    subject: { type: String, required: true },
    number: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    creditHours: { type: String, required: true },
    sectionInfo: { type: String },
    degreeAttributes: { type: String, required: true },
    crn: { type: String, required: true },
    section: { type: String, required: true },
    statusCode: { type: String },
    partOfTerm: { type: String, required: true },
    sectionTitle: { type: String },
    sectionCreditHours: { type: String, required: true },
    enrollmentStatus: { type: String, required: true },
    type: { type: String, required: true },
    typeCode: { type: String, required: true },
    startTime: { type: Date(), required: true },
    endTime: { type: Date, required: true },
    daysOfWeek: { type: String, required: true },
    room: { type: Number, required: true },
    building: { type: String, required: true },
    instructor: [{ type: String, required: true }],
})

export default mongoose.model.CourseWithDescription || mongoose.model('CourseWithDescription', courseWithDescriptionSchema)