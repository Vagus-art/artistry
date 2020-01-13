const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

//check if session was started, pass as variable to every render please
let check = ()=>(sess.nickname!=undefined);


//get
router.get('/',(req,res)=>{
  sess = req.session;
  res.render('home',{message:'Welcome to artistry! Log in or Sign up to show your talents.',nickname:sess.nickname,chcksess:check()});
});
router.get('/search', async (req,res)=>{
  try{
    sess = req.session;
    //search for partial string
    myregex = new RegExp(req.query.searchbar,"i");
    const result = await postModel.find({title:{ $regex: myregex, $options: 'i' }}).lean();
    if(result.length!=0){
      res.render('search',{results:result,chcksess:check()});
    }
    else{
      res.render('search',{message:'No results found for \"' + req.query.searchbar + "\"",chcksess:check()});
    }
  }
  catch(err){
    console.log('there has been an error on the search route: ' + err);
  }
});
router.get('/login',(req,res)=>{
  res.render('login');
});
router.get('/signup',(req,res)=>{
  res.render('signup');
});
router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})

//post
router.post('/signup',async (req,res)=>{
  const user = new userModel({
    nickname:req.body.nickname,
    password:await bcrypt.hash(req.body.password,10),
    email:req.body.email
  });
  await user.save();
  res.render('home',{message:'User ' + req.body.nickname + ' has been registered succesfully'});
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
        res.redirect('/');
        }
        else{
        res.render('login',{message:"Password invalid!"});
        }
    }
    else{
        res.render('login',{message:'Nickname not found!'})
    }
}
catch(error){
  console.log(error,'login');
}
});

//dev api
router.get('/api', async (req,res)=>{
  try {const db = await postModel.find();
  res.json(db);}
  catch(err){
    console.log(err);
  }
});
router.post('/api', async (req,res)=>{
  const post = new postModel({
    title:req.body.title,
    content:req.body.content,
    tags:req.body.tags,
    date:req.body.date
  });
  await post.save();
  res.send('done');
});
router.get('/api/users',async (req,res)=>{
  const users = await userModel.find();
  res.json(users);
})

module.exports = router;
