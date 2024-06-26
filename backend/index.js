const port = 8080;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');  // to get the path of backend directory in express
const cors = require('cors');  //permission to access the backend
const { error } = require('console');


app.use(express.json());  
app.use(cors());

// Dtabase connection with mongodb
mongoose.connect("mongodb+srv://gemini:gemini1479@cluster0.biv9qnt.mongodb.net/Gemini");

//api creation

app.get("/",(req,res)=>{
    res.send("Express App is running")
})

//schema create for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique: true,
    },
    password:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// creating endpoint for registring user

app.post('/signup',async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({sucess:false,errors:"existing user found with same email address"})
    }
        const user = new Users({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
        })

    await user.save();
    // creating token
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret_gem')
    res.json({success:true,token})
})

// creating endpoint fior user login
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password===user.password;
        if(passCompare){
            const data = {
                user: {
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_gem');
            res.json({
                success:true,token
            });
        }
        else{
            res.json({success:false,errors:"Wrong password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email Id"});
    }
})


app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port: " +port)
    }else{
        console.log("Error :" +error)
    }
})

