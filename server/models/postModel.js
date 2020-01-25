const mongoose = require("mongoose");
const Schema = {
  nickname: String,
  content: String,
  tags: Array,
  date: String
};
module.exports = mongoose.model("post", Schema);
