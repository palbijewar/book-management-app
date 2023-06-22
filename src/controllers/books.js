import Books from '../models/booksModel.js';
import Users from '../models/usersModel.js';

import moment from 'moment';
import {isValidReqBody} from '../utils/utile.js';


export const books = async (req, res) => {
    try {
        const { title, excerpt, userId, category, subcategory, releasedAt } = req.body;
        // Validations
        if (!isValidReqBody(req.body)) {
            return res.status(400).json({ status: false, message: "Empty data" });
        }
        if (!title) {
            return res.status(400).json({ status: false, message: "Please provide the title" });
        }
        if (!excerpt) {
            return res.status(400).json({ status: false, message: "Please provide the excerpt" });
        }
        if (!userId) {
            return res.status(400).json({ status: false, message: "Please provide the userId" });
        }
        if (!category) {
            return res.status(400).json({ status: false, message: "Please provide the category" });
        }
        if (!subcategory) {
            return res.status(400).json({ status: false, message: "Please provide the subcategory" });
        }
        if (!releasedAt) {
            return res.status(400).json({ status: false, message: "Please provide the date of release" });
        }

        const data = {
            title,
            excerpt,
            userId,
            category,
            subcategory,
            releasedAt
        };

        const book = await Books.create(data);

        // Format the releasedAt field as yy-mm-dd
        const formattedReleasedAt = moment(book.releasedAt).format("YY-MM-DD");

        res.status(201).json({ status: true, data: { ...book.toJSON(), releasedAt: formattedReleasedAt } });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const getBooks = async (req, res) => {
    try {
        const { userId, category, subcategory } = req.query;
        if (!userId && !category && !subcategory) {
            return res.status(400).json({ status: false, message: "Please provide at least one query parameter" });
        }
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(400).json({ status: false, message: "User not found" });
        }
        const books = await Books.find({
            $and: [
                {
                    $or: [
                        { userId: userId },
                        { category: category },
                        { subcategory: subcategory }
                    ]
                },
                { isDeleted: false }
            ]
        });

        if (books.length === 0) {
            return res.status(400).json({ status: false, message: "Books not found" });
        }

        const data = books.map(book => ({
            _id: book._id,
            title: book.title,
            excerpt: book.excerpt,
            userId: book.userId,
            category: book.category,
            reviews: book.reviews,
            releasedAt: book.releasedAt.toISOString().split('T')[0] 
        }));

        res.status(200).json({ status: true, data: data });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const booksById = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const book = await Books.findById(bookId).populate('reviews');

        if (!book) {
            return res.status(404).json({ status: false, message: "Book not found" });
        }

        let reviewsData = [];
        if (Array.isArray(book.reviews)) {
            reviewsData = book.reviews.map(review => ({
                reviewId: review._id,
                rating: review.rating,
                comment: review.comment
            }));
        }

        const data = {
            _id: book._id,
            title: book.title,
            excerpt: book.excerpt,
            userId: book.userId,
            category: book.category,
            reviewsData: reviewsData,
            releasedAt: book.releasedAt.toISOString().split('T')[0]
        };

        res.status(200).json({ status: true, data: data });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};



export const updateBooks = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        const book = await Books.findOne({
            _id: bookId,
            isDeleted: false
        });

        if (!book) {
            return res.status(404).json({ status: false, message: "Book not found" });
        }

        const { title, excerpt, releasedAt, ISBN } = req.body;

        if (!title && !excerpt && !releasedAt && !ISBN) {
            return res.status(400).json({ status: false, message: "Please provide at least one detail to update" });
        }

        if (title && title !== book.title) {
            const existingBook = await Books.findOne({ title: title, isDeleted: false });
            if (existingBook) {
                return res.status(400).json({ status: false, message: "Title already exists" });
            }
            book.title = title;
        }

        if (excerpt && excerpt !== book.excerpt) {
            book.excerpt = excerpt;
        }

        if (releasedAt && releasedAt !== book.releasedAt.toISOString().split('T')[0]) {
            book.releasedAt = moment(releasedAt, "YYYY-MM-DD");
        }

        if (ISBN && ISBN !== book.ISBN) {
            const existingBook = await Books.findOne({ ISBN: ISBN, isDeleted: false });
            if (existingBook) {
                return res.status(400).json({ status: false, message: "ISBN already exists" });
            }
            book.ISBN = ISBN;
        }

        const updatedBook = await book.save();
        res.status(200).json({ status: true, data: updatedBook });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

export const removeBook = async(req,res)=>{
    try {
    const bookId = req.params.bookId;
    const book = await Books.findOneAndUpdate({_id:bookId},{isDeleted:true},{new:true});
    if(!book) return res.status(404).json({status:false,message:'book not found or already deleted'});
    res.status(200).json({status:true,message:"book deleted successfully"});
    } catch (error) {
    res.status(500).json({ status: false, message: error.message });   
    }
};

