const mongoose = require("mongoose");
const Schema = {
  nickname: String,
  password: String,
  email: String
};
module.exports = mongoose.model("user", Schema);
