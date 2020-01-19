const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');
//articles mongodb model

const userModel = require('../models/userModel');
//user mongodb model

const bcrypt = require('bcryptjs');
//hash encryption for submitted passwords

//ROUTING

//GET

//route intended for search queryes, with partial strings
router.get('/search', async (req,res)=>{
  try{
    res.set('Access-Control-Allow-Origin','*');
    sess = req.session;

    //search for partial string
    searchedQuery = new RegExp(req.body.searchbar,"i");
    //string to regex

    const result = await postModel.find({title:{ $regex: searchedQuery }}).lean();
    //get posts from database, filtered by searchedQuery regex

    //if results aren't found, return a message
    if(result.length!=0){
      res.json({results:result});
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

//logout route, kills current session
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.send('User logged');
})

//POST

//register route, posts user info to db and hashes password
router.post('/signup',async (req,res)=>{
  const user = new userModel({
    nickname:req.body.nickname,
    password:await bcrypt.hash(req.body.password,10),
    email:req.body.email
  });
  await user.save();
  res.json({message:'Registered succesfully'});
});

//login route, compares hashed password and establishes a session, if values are invalid, returns error messages to client
router.post('/login',async (req,res)=>{
  try{
    sess = req.session;
    const [nickname,password] = [req.body.nickname,req.body.password];
    const user = await userModel.findOne({nickname:nickname});
    if(user){
        const match = await bcrypt.compare(password,user.password);
        if(match){
        sess.nickname = nickname;
        res.json({message:'Logged successfully'});
        }
        else{
        res.json({message:"Password invalid!"});
        }
    }
    else{
        res.json({message:'Nickname not found!'})
    }
}
catch(error){
  console.log(error,'login');
}
});

//route for article posting, authentication is needed, but not yet implemented
router.post('/posts', async (req,res)=>{
  const post = new postModel({
    title:req.body.title,
    content:req.body.content,
    tags:req.body.tags,
    date:req.body.date
  });
  await post.save();
  res.send('done');
});

//DEV API

//get all posts
router.get('/api', async (req,res)=>{
  try {const db = await postModel.find();
  res.json(db);}
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
