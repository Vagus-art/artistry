const express = require('express');
const app = express();
const database = require('./database.js');
const port = process.env.PORT || 3000;
const router = require('./routes/router.js');
const bodyparser = require('body-parser');
const session = require('express-session');
const uuid = require('uuid');

var sess;

//middleware
//app.use(express.static('./build'));
// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyparser.json())
// sessions
app.use(session({
    genid: ()=>uuid(),
  secret: 'mysecret'})
);

//routes
app.use('/api', router);


//server start
app.listen(port,()=>console.log(`Server listening on port ${port}`))
