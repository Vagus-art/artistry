const mongoose = require("mongoose");
const Schema = {
  id: String,
  content: String,
  description: String,
  tags: Array,
  date: String
};
module.exports = mongoose.model("post", Schema);
