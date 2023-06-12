const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const bookSchema= new Schema(
   {
    name:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
     genre:{
        type:String,
        required:true,
    },
    publisher:{
        type:String,
        required:true,
    }
    
   },
   {
    timestamp:true,         //creating a timestamp wherever a book is created
   }

)

//id is generated automatically by mongodb represented by _id

module.exports=mongoose.model("book",bookSchema)  //collection will be called as books in the database