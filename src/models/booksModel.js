import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const bookSchema = new Schema({
    title: {
    type:String, 
    required:true, 
    unique:true
    },
    excerpt: {
    type:String, 
    required:true, 
    }, 
    userId: {
        type:Schema.Types.ObjectId, 
        required:true, 
        ref:'user'
    },
    ISBN: {
        type:String, 
        required:true, 
        unique:true  
    },
    category: {
        type:String, 
        required:true,
    },
    subcategory: {
        type:String, 
        required:true,
    },
    reviews: {
        type:Number, 
        default: 0
    },
    deletedAt: {
        type:Date
    }, 
    isDeleted: {
        type:Boolean, 
        default: false
    },
    releasedAt: {
        type:Date, 
        required:true, 
    },
},{timestamps:true});

const books = model('book',reviewSchema);

export default books;