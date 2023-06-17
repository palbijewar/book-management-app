import mongoose from 'mongoose';

const {Schema,model} = mongoose;

const userSchema = new Schema({
  title: {
    type:String, 
    required:true, 
    enum:[Mr, Mrs, Miss]
},
  name: {
    type:String, 
    required:true,
  },
  phone: {
    type:String, 
    required:true, 
    unique:true
},
  email: {
    type:String, 
    required:true, 
    unique:true
  }, 
  password: {
    type:String,
    required:true,
    minlength:8,
    mixlength:15
},
  address: {
    street:String,
    city:String,
    pincode:String
  }
},{timestamps:true});

const users = model('user',userSchema);

export default users;