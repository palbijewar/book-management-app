import express from 'express';
import {signup,login} from '../controllers/users.js';
const router = express.Router();1

router.post('/register',signup);
router.post('/login',login);

export default router;