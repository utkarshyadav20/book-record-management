const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    issuedBook: {
      type: mongoose.Schema.Types.ObjectId,      //id will be taken from the id of the books collection
      ref:"book",
      required: false,
    },
    issuedDate: {
      type: String,
      required: false,
    },
    returnDate: {
      type: String,
      required: false,
    },
    subscriptionType: {
      type: String,
      required: true,
    },
    subscriptionDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//id is generated automatically by mongodb represented by _id

module.exports = mongoose.model("user", userSchema); //collection will be called as books in the database
