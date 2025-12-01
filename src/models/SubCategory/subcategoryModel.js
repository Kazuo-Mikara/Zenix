// models/subCategory.model.js
import { Schema, model } from 'mongoose';

const subCategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, // Store names in lowercase
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: Schema.Types.ObjectId, // This is the "foreign key"
        ref: 'Category', // This links to the Category model
        required: true,
    },
    // Admins will create and manage these documents, linking them to a Category.
    // When creating a subcategory, you'll need the _id of an existing Category.
}, { timestamps: true });

// Optional: Add a compound unique index if a subcategory name must be unique *within* a category
// subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

export default model('SubCategory', subCategorySchema);