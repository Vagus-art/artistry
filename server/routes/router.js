const express = require("express");
const router = express.Router();
const postModel = require("../models/postModel");
//articles mongodb model

const jwt = require("jsonwebtoken");
const config = require("../config");
//web token framework

const userModel = require("../models/userModel");
//user mongodb model

const bcrypt = require("bcryptjs");
//hash encryption for submitted passwords

//ROUTING

//GET

//route intended for search queries, with partial strings
router.get("/search", async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");

    //search for partial string
    searchedQuery = new RegExp(req.body.searchbar, "i");
    //string to regex

    //const result = await postModel.find({nickname:{ $regex: searchedQuery }}).lean();
    const result = await postModel.find().lean();
    //get posts from database, filtered by searchedQuery regex

    //if results aren't found, return a message
    if (result.length != 0) {
      res.json(result);
    } else {
      res.json({ message: "No results found for " + req.body.searchbar });
    }
  } catch (err) {
    //generic error handling
    res.send(err);
  }
});

//POST

//register route, posts user info to db and hashes password
router.post("/signup", async (req, res) => {
  try {
    const [nickname, email] = [req.body.nickname, req.body.email];
    const usercheck = await userModel.findOne({
      $or: [{ nickname: nickname }, { email: email }]
    });
    //checkeando si el usuario existe, voy a mandar mensajes desde el servidor
    if (!usercheck) {
      const user = new userModel({
        nickname: req.body.nickname,
        password: await bcrypt.hash(req.body.password, 10),
        email: req.body.email,
        profileimg: "https://elysator.com/wp-content/uploads/blank-profile-picture-973460_1280-e1523978675847.png"
      });
      await user.save();
      res.status(200).json({ message: "Registered succesfully" });
    } else {
      res.status(401).json({ error: "Nickname already exists" });
    }
  } catch (err) {
    res
      .status(401)
      .json({ error: "An error happened on registration, try again later..." });
  }
});

//login route, compares hashed password and establishes a session, if values are invalid, returns error messages to client
//on valid login sends a json web token to be stored in localstorage (client)
router.post("/login", async (req, res) => {
  try {
    const [nickname, password] = [req.body.nickname, req.body.password];
    const user = await userModel.findOne({ nickname: nickname });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            id: user._id
          },
          config.jwtSecret
        );
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: "Password invalid!" });
      }
    } else {
      res.status(401).json({ error: "Nickname not found!" });
    }
  } catch (error) {
    console.log(error, "login");
  }
});

//route for article posting, authentication is needed, but not yet implemented
router.post("/posts", async (req, res) => {
  try {
    const now = new Date();
    const post = new postModel({
      id: req.body.id,
      content: req.body.content,
      description: req.body.description,
      tags: req.body.tags,
      date: now.toLocaleDateString()
    });
    await post.save();
    res.send("done");
  } catch (err) {
    res.json({ error: "there has been an error when posting... " + err });
  }
});

//PUT

//FIX THIS, IT WORKS BUT IT'S UGLY
router.put("/profileedit", async (req, res) => {
    const tokenUser = await jwt.decode(req.body.token);
    const profileimg = req.body.user.profileimg;
    await userModel.findOneAndUpdate(
      { _id: tokenUser.id },
      { profileimg: req.body.user.profileimg }
    , {upsert:true});

    const user = await userModel.findOne({ _id: tokenUser.id });

    res.status(200).json({ message: "done", user });
  }
);

//Get specific user
router.get('/user',async (req,res)=>{
  const user = await userModel.findOne({_id:req.query.id});
  if(user){
    const {nickname, profileimg, email} = user;
    res.status(200).json({nickname, profileimg, email, id:req.query.id});
  }
  else{
    res.status(404).json({error:"user not found"});
  }
})

//DEV API

//get all posts
router.get("/", async (req, res) => {
  try {
    const result = await postModel.find().lean();
    res.set("Access-Control-Allow-Origin", "*");
    res.json(result);
  } catch (err) {
    console.log(err);
  }
});

//get all users data
router.get("/api/users", async (req, res) => {
  const users = await userModel.find();
  res.json(users);
});

module.exports = router;
