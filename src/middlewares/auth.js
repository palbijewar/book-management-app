import Users from '../models/usersModel.js';
import Books from '../models/booksModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const auth = async(req,res,next)=>{
    try {
        const token = req.headers['x-api-key']

        if(!token) return res.status(404).json({status: false, message : "Token Not Found."})

        const docoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await Users.findById(docoded.userId)

        if(!user) return res.status(401).json({status : false, message : "User Not Authenticated to access this route"})

        req.user_id = user.userId

        next()

    } catch (error) {
        res.status(500).json({status : false, message : error.message})
    }
}

export const authorization = async (req, res, next) => {
    try {
        const tokenUser = req.decodedToken.id
        const bookId = req.params.bookId
        if (!isValid(bookId)) return res.status(400).json({
            status: false,
            message: "Invalid bookId"
        })
       
        const book = await Books.findById(bookId).where('isDeleted').equals(false);
        if (!book) {
            return res.status(404).json({
                status: false,
                message: "No books found with this bookId"
            })
        }
        const userId = book["userId"].toString()
        if (userId != tokenUser) {
            return res.status(403).json({
                message: "You are not authorized"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })

    }
}