const express = require("express");
const app = express();
//backend framework

const router = require("./routes/router.js");
//routing

const bodyparser = require("body-parser");
//parse requests

const database = require("./database.js");
//connection to mongodb

const port = process.env.PORT || 4000;
//host PORT

//global session variable

//MIDDLEWARE

app.use("/", express.static("../client/build"));
//serve compiled react static page

app.use(bodyparser.urlencoded({ extended: false }));
//parse application/x-www-form-urlencoded

app.use(bodyparser.json());
//parse application/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change later to only allow our server
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//ROUTES

app.use("/api", router);
//main REST API router

//server start
app.listen(port, () => console.log(`Server listening on port ${port}`));
