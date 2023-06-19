import express from 'express';
import {books,getBooks,booksById,updateBooks, removeBook} from '../controllers/books.js';
const router = express.Router();


router.post('/books',books);
router.get('/books',getBooks);
router.get('/books/:bookId',booksById);
router.put('/books/:bookId',updateBooks);
router.delete('/books/:bookId',removeBook);


export default router;