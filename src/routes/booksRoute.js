import express from 'express';
import aws from 'aws-sdk';
import multer from 'multer';
import {books,getBooks,booksById,updateBooks, removeBook} from '../controllers/books.js';
import {auth} from '../middlewares/auth.js';
const router = express.Router();

aws.config.update({
accessKeyId: "AKIAY3L35MCRZNIRGT6N",
secretAccessKey: "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",
region: "ap-south-1"
})

router.post('/books',auth,books);
router.get('/books',auth,getBooks);
router.get('/books/:bookId',auth,booksById);
router.put('/books/:bookId',auth,updateBooks);
router.delete('/books/:bookId',auth,removeBook);


export default router;