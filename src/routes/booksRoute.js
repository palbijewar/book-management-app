import express from 'express';
import {books,getBooks,booksById,updateBooks, removeBook} from '../controllers/books.js';
import {auth} from '../middlewares/auth.js';
const router = express.Router();


router.post('/books',auth,books);
router.get('/books',auth,getBooks);
router.get('/books/:bookId',auth,booksById);
router.put('/books/:bookId',auth,updateBooks);
router.delete('/books/:bookId',auth,removeBook);


export default router;