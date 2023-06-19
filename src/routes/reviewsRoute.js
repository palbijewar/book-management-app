import express from 'express';
import {review,updateReview,deleteReview} from '../controllers/reviews.js';
const router = express.Router();

router.post('/books/:bookId/review',review);
router.put('/books/:bookId/review/:reviewId',updateReview);
router.delete('/books/:bookId/review/:reviewId',deleteReview);

export default router;