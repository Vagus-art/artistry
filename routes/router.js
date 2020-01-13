const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');

//get
router.get('/',(req,res)=>{
  res.render('home');
});
router.get('/search', async (req,res)=>{
  try{
    //search for partial string
    myregex = new RegExp(req.query.searchbar,"i");
    const result = await postModel.find({title:{ $regex: myregex, $options: 'i' }}).lean();
    if(result.length!=0){
      res.render('search',{results:result});
    }
    else{
      res.render('search',{message:'No results found for \"' + req.query.searchbar + "\""});
    }
  }
  catch(err){
    console.log(err);
  }
})

//api
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

module.exports = router;
