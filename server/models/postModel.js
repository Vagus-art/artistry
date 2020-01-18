const mongoose = require('mongoose');
const Schema = {
  title:String,
  content:String,
  tags:Array,
  date:Date
}
module.exports = mongoose.model('post',Schema);
