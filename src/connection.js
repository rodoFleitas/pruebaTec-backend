const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connectToDB = () => {
  console.log(`--> Connecting to DB...`);
  return mongoose.connect(MONGO_URI);
};
