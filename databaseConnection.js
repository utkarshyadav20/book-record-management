const mongoose = require("mongoose");

function dbConncetion() {
  const DB_URL = process.env.MONGO_URI;
  mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true, //to fix all deprecation warnings caused by using mongoose {used to solve driver version mismatch error{similar}}
  });
  // to catch the all the stages in a DB connection lfecycle 👇
  const db = mongoose.connection; // variable made to monitor all the stages of db connection

  db.on("error", console.error.bind(console, "Connection error: ")); //on checks the connection continuoisly //bind is used to make a function out of a old fucntion{here the properties of console are used to show connection error}
  db.once("open", function () {
    console.log("DB connected..");
  });
}

module.exports = dbConncetion;
