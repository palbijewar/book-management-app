import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './routes/usersRoute.js';
import books from './routes/booksRoute.js';
import reviews from './routes/reviewsRoute.js';
import multer from 'multer';
import aws from 'aws-sdk';

dotenv.config();

const app = express();

app.use(express.json());

// multer middleware
app.use( multer().any())

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true
    }).then(()=>{console.log('Mongoose connected!')}).catch((error)=>console.log(error));
    
app.get('/',(req,res)=>{
    res.status(200).json({status : true, message : "API is Live"})
 })
        
app.use('/',users);
app.use('/',books);
app.use('/',reviews);

app.listen(process.env.PORT, ()=>{
            console.log(`server running at PORT : ${process.env.PORT}`)
        });





