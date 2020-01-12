const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const port = process.env.PORT || 3000;
const router = require('./routes/router.js');

//handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//middleware
app.use(express.static('./public'))

//routes
app.use('/', router);

//server start
app.listen(port,()=>console.log(`Server listening on port ${port}`))
