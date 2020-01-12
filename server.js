const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const database = require('./database.js');
const port = process.env.PORT || 3000;
const router = require('./routes/router.js');
const bodyparser = require('body-parser');


//handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//middleware
app.use(express.static('./public'));
app.use(bodyparser.json());

//routes
app.use('/', router);

//server start
app.listen(port,()=>console.log(`Server listening on port ${port}`))
