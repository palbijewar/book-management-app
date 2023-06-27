import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const { Schema, model } = mongoose;

const bookSchema = new Schema({
    bookCover:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    excerpt: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4
    },
    category: {
        type: String,
        required: true,
        lowercase:true
    },
    subcategory: {
        type: String,
        required: true,
        lowercase:true
    },
    reviews: {
        type: Number,
        default: 0,
        comment: "Holds number of reviews of this book"
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required:true 
    },
}, { timestamps: true });


const Book = model('Book', bookSchema);

export default Book;
