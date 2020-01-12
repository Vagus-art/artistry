const express = require('express');
const router = express.Router();
const postModel = require('../models/postModel');

//get
router.get('/',(req,res)=>{
  res.render('home');
});
router.get('/search', async (req,res)=>{
  const result = await postModel.findOne({title:req.params.searchbar});
  res.render('search',{results:result});
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
