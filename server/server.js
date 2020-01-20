const express = require('express');
const app = express();
//backend framework

const router = require('./routes/router.js');
//routing

const bodyparser = require('body-parser');
//parse requests

const database = require('./database.js');
//connection to mongodb

const port = process.env.PORT || 3000;
//host PORT

var sess;
//global session variable

//MIDDLEWARE

//app.use(express.static('./build'));
//serve compiled react static page

app.use(bodyparser.urlencoded({ extended: false }))
//parse application/x-www-form-urlencoded

app.use(bodyparser.json())
//parse application/json


//ROUTES

app.use('/api', router);
//main REST API router


//server start
app.listen(port,()=>console.log(`Server listening on port ${port}`))
