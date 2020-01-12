const express = require('express');
const router = express.Router();

//get
router.get('/',(req,res)=>{
  res.render('home');
})

module.exports = router;
