const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');
//articles mongodb model

const jwt = require('jsonwebtoken');
const config = require('../config');
//web token framework

const userModel = require('../models/userModel');
//user mongodb model

const bcrypt = require('bcryptjs');
//hash encryption for submitted passwords

//ROUTING

//GET

//route intended for search queries, with partial strings
router.get('/search', async (req,res)=>{
  try{
    res.set('Access-Control-Allow-Origin','*');

    //search for partial string
    searchedQuery = new RegExp(req.body.searchbar,"i");
    //string to regex

    //const result = await postModel.find({nickname:{ $regex: searchedQuery }}).lean();
    const result = await postModel.find().lean();
    //get posts from database, filtered by searchedQuery regex

    //if results aren't found, return a message
    if(result.length!=0){
      res.json(result);
    }
    else{
      res.json({message:'No results found for ' + req.body.searchbar});
    }
  }
  //generic error handling
  catch(err){
    res.send(err);
  }
});

//POST

//register route, posts user info to db and hashes password
router.post('/signup',async (req,res)=>{
  try{
      const [nickname,email] = [req.body.nickname,req.body.email];
      const usercheck = await userModel.findOne({$or:[
       {nickname:nickname}, {email:email}
     ]});
     //checkeando si el usuario existe, voy a mandar mensajes desde el servidor
      if (!usercheck) {
      const user = new userModel({
        nickname:req.body.nickname,
        password:await bcrypt.hash(req.body.password,10),
        email:req.body.email
      });
      await user.save();
      res.status(200).json({message:'Registered succesfully'});
    }
    else {
      res.status(401).json({error:'Nickname already exists'});
    }
    }
    catch(err){
      res.status(401).json({error:'An error happened on registration, try again later...'});
    }
});

//login route, compares hashed password and establishes a session, if values are invalid, returns error messages to client
//on valid login sends a json web token to be stored in localstorage (client)
router.post('/login',async (req,res)=>{
  try{
    const [nickname,password] = [req.body.nickname,req.body.password];
    const user = await userModel.findOne({nickname:nickname});
    if(user){
        const match = await bcrypt.compare(password,user.password);
        if(match){
        const token = jwt.sign({
          id : user._id,
          nickname : user.nickname,
          email : user.email
        }, config.jwtSecret)
        res.status(200).json({token});
        }
        else{
        res.status(401).json({error:"Password invalid!"});
        }
    }
    else{
        res.status(401).json({error:'Nickname not found!'})
    }
}
catch(error){
  console.log(error,'login');
}
});



//route for article posting, authentication is needed, but not yet implemented
router.post('/posts', async (req,res)=>{
  const now = new Date();
  const post = new postModel({
    nickname:req.body.nickname,
    content:req.body.content,
    tags:req.body.tags,
    date:now.toLocaleDateString()
  });
  await post.save();
  res.send('done');
});

//DEV API

//get all posts
router.get('/', async (req,res)=>{
  try {
  const result = await postModel.find().lean();
  res.set('Access-Control-Allow-Origin','*');
  res.json(result);
  }
  catch(err){
    console.log(err);
  }
});

//get all users data
router.get('/api/users',async (req,res)=>{
  const users = await userModel.find();
  res.json(users);
})

module.exports = router;
