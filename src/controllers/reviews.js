import Reviews from '../models/reviewModel.js';
import Books from '../models/booksModel.js';
import Users from '../models/usersModel.js';
import moment from 'moment';
import {isValid,validString,isValidReqBody} from '../utils/utile.js';

export const review = async(req,res)=>{
    try {
        const {bookId, reviewedBy,reviewedAt,rating,review} = req.body;
        if(!isValidReqBody(req.body)) return res.status(400).json({status:false,message:"no data"});
        const book = await Books.findOneAndUpdate(
            {_id:bookId,isDeleted:false},
            {$inc:{reviews:1}},
            {new:true}
            ); 
        if(!book) return res.status(400).json({status:false,message:"book not found"});
        const data = {bookId, reviewedBy,reviewedAt,rating,review};
        const response = await Reviews.create(data);
        const formattedReleasedAt = moment(book.releasedAt).format("YY-MM-DD");
        res.status(201).json({ status: true, data: { ...response.toJSON(), releasedAt: formattedReleasedAt } });
    } catch (error) {
    res.status(500).json({status:false,message:error.message});  
    }
};

export const updateReview = async(req,res)=>{
    try {
        const {bookId,reviewId} = req.params;
        const book = await Books.findById(bookId);
        if(!book) return res.status(400).json({status:false,message:"book not found"});
        const {review, rating, reviewer} = req.body;
        if(!isValidReqBody(req.body)) return res.status(400).json({status:false,message:"no data"});
        if (!review && !rating && !reviewer) {
            return res.status(400).json({ status: false, message: "no field to update in body" });
        }
        const updateReview = await Reviews.findOneAndUpdate({_id:reviewId},req.body,{new:true});
        res.status(200).json({status:true,data:updateReview});
    } catch (error) {
    res.status(500).json({status:false,message:error.message});   
    }
};

export const deleteReview = async(req,res)=>{
    try {
        const {bookId,reviewId} = req.params;
        const book = await Books.findById(bookId);
        if(!book) return res.status(400).json({status:false,message:"book not found"});
        const updateReview = await Reviews.findOneAndDelete({_id:reviewId});
        if(!updateReview) return res.status(400).json({status:false,message:"review not found or already deleted"});
        res.status(200).json({status:true,message:"review is deleted"});
    } catch (error) {
    res.status(500).json({status:false,message:error.message});   
    }
};