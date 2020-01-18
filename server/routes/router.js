const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

//get
router.get('/search', async (req,res)=>{
  try{
    res.set('Access-Control-Allow-Origin','*');
    sess = req.session;
    //search for partial string
    myregex = new RegExp(req.body.searchbar,"i");
    const result = await postModel.find({title:{ $regex: myregex }}).lean();
    if(result.length!=0){
      res.json({results:result});
    }
    else{
      res.json({message:'No results found for ' + req.body.searchbar});
    }
  }
  catch(err){
    res.send(err);
  }
});
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.send('User logged');
})

//post
router.post('/signup',async (req,res)=>{
  const user = new userModel({
    nickname:req.body.nickname,
    password:await bcrypt.hash(req.body.password,10),
    email:req.body.email
  });
  await user.save();
  res.json({message:'Registered succesfully'});
});
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

//dev api
router.get('/api', async (req,res)=>{
  try {const db = await postModel.find();
  res.json(db);}
  catch(err){
    console.log(err);
  }
});
router.get('/api/users',async (req,res)=>{
  const users = await userModel.find();
  res.json(users);
})

module.exports = router;
