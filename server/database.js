const mongoose = require("mongoose");
const uri =
  "mongodb+srv://test:case@musicality-v04uq.mongodb.net/test?retryWrites=true&w=majority";
//mongodb ATLAS uri

mongoose.connect(uri, () => console.log("Database connected"));
module.exports = mongoose;
