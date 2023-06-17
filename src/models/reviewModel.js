import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  bookId: {
    type: Schema.Types.ObjectId,
    required:true, 
    ref:'book' 
},
  reviewedBy: {
    type:String, 
    required:true, 
    default: 'Guest', 
},
  reviewedAt: {
    type:Date, 
    required:true
},
  rating: {
    type:Number, 
    minlength: 1, 
    maxlength: 5, 
    required:true
},
  review: {
    type:String
},
  isDeleted: {
    type:Boolean, 
    default: false},
},{timestamps:true});

const reviews = model('review',reviewSchema);

export default reviews;