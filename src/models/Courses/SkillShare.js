import mongoose from 'mongoose';

const SkillShareSchema = new mongoose.Schema({
    title: 'String',
    link: 'String',
    duration: 'String',
    instructor: 'String',
    students: 'String'

})

export default mongoose.models.SkillShare || mongoose.model('SkillShare', SkillShareSchema);