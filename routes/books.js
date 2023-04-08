const express=require("express");
const Router=express.Router();
const { users } = require('../data/users.json');
const { books } = require('../data/books.json');


/*
* Route: /
* Method: GET
* Description: Get all books
* Access: public
* Parameters: None
*/
Router.get("/",(req,res)=>{
    res.status(200).json({
        success:true,
        data:books
    });
});
/*
* Route: /
* Method: POST
* Description: Add a new book in db
* Access: public
* Parameters: None
*/
Router.post("/",(req,res)=>{
    const {id,name,author,genre,price,publisher}=req.body;
    const a=req.body;
    const book=books.find((each)=>each.id===id)
    if(book){
        return res.status(404).json({
            success:false,
            message:"User alredy exists with the given id"
        });
    }
   books.push({
    id,
    name,
    author,
    genre,
    price,
    publisher
   });
   return res.status(200).json({
    success:true,
    message:"Follwing book added:>",
    data:a,
   });  
})
/*
* Route: /books/:id
* Method: GET
* Description: Get a book by id
* Access: public
* Parameters: id
*/
Router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id===id);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"No book exists by the given id"
        });
    }
    return res.status(200).json({
        success:true,
        message:"Book found",
        data:book
    });
})
/*
* Route: /books/:id
* Method: DELETE
* Description: Delete a book by id
* Access: public
* Parameters: id
*/
Router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const book=books.find((each)=>each.id===id);
    if(!book){
        return res.status(400).json({
            success:false,
            message:"Book by given id does not exists"
        });
    }
    const index=books.indexOf(book);
    books.splice(index,1);
    return res.status(200).json({
        success:true,
        message:"Deleted the  item:>",
        data:book
    });
})
/*
* Route: /books/:id
* Method: PUT
* Description: Update a book by id
* Access: public
* Parameters: id
*/
Router.put("/:id",(req,res)=>{
   const {id}=req.params;
   const book=books.find((each)=>each.id===id);
   if(!book){

   }
})


module.exports=Router;