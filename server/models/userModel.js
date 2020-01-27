const mongoose = require("mongoose");
const Schema = {
  nickname: String,
  password: String,
  email: String,
  profileimg: String
};
module.exports = mongoose.model("user", Schema);
