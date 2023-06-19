import Users from '../models/usersModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {isValid,isValidTitle,validString,isValidReqBody,validateEmail,isValidPassword,isValidPhoneNumber} from '../utils/utile.js';

dotenv.config();

export const signup = async(req,res)=>{
try {
const {title,name,phone,email,password,address} = req.body;
//validations
if(!isValidTitle(title)) return res.status(400).json({status:false,message:"title must be Mr, Miss or Mrs only!"});

if(!isValidReqBody(req.body)) return res.status(400).json({status:false,message:"form is empty, fill the form!"});

if(!title || !name || !phone || !email || !password || !address) return res.status(400).json({status:false,message:"enter all the mendatory fields!"}); 

if(!validString(name))return res.status(400).json({status:false,message:"incorrect format for name"});

if(!isValidPhoneNumber(phone))return res.status(400).json({status:false,message:"incorrect format for phone no."});

if(!validateEmail(email))return res.status(400).json({status:false,message:"incorrect format for email"});

if(!isValidPassword(password))return res.status(400).json({status:false,message:"incorrect format for password"});

const data = {title,name,phone,email,password,address};

const user = await Users.create(data);
res.status(201).json({status:true,data:user})
} catch (error) {
res.status(400).json({status:false,message:error.message})
}
};

export const login = async(req,res)=>{
    try {
    const {email,password} = req.body;
    //validations
    if(!isValidReqBody(req.body)) return res.status(400).json({status:false,message:"form is empty, fill the form!"});
    
    if(!email || !password ) return res.status(400).json({status:false,message:"empty fields!"}); 
    
    if(!validateEmail(email))return res.status(400).json({status:false,message:"incorrect format for email"});
    
    if(!isValidPassword(password))return res.status(400).json({status:false,message:"incorrect format for password"});
    
    const user = await Users.findOne({email:email})
    if(!user)return res.status(404).json({status:false,message:"user not found"});
    const token = jwt.sign({
        userId: user._id.toString()
      }, process.env.JWT_SECRET, {
        expiresIn: '3d'
      })
    res.setHeader('auth-token',token);
    res.status(200).json({status:true,data:token})
    } catch (error) {
    res.status(500).json({status:false,message:error.message});
    }
    };