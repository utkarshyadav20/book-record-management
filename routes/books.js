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
   const {data}=req.body;
//    console.log(data);
   const book=books.find((each)=>each.id===id);
   if(!book){
      return res.status(404).json({
        success:false,
        message:"No book with the given id found"
      })
   }
//    const newBooks=books.map((each)=>{
//        if(each.id===id){
//         return {
//             ...each,
//             ... data
//         }
//        }   
//        return {
//         ...data,
//         ...each
//        }    

//    })
  const index=books.indexOf(book);
  const saperatedData= books.splice(index,1);
  const saperatedObject=saperatedData[0];
  const modifiedObj=Object.assign(saperatedObject,data);
  books.push(modifiedObj);
  books.sort((obj1,obj2)=>{
    return obj1.id-obj2.id;
  })
  return res.status(200).json({
    success:true,
    message:"Book updated",
    data:modifiedObj,
  })
    
})
/*
* Route: /books/issued/by-users
* Method: Get
* Description: Get a list if all the bookks and users
* Access: public
* Parameters: none
*/
Router.get("/issued/by-users",(req,res)=>{
   const usersWithIssuedBooks=users.filter((each)=>{
    if(each.issuedBook){
        return each;
    }
   })
   const issuedBook=[];

   usersWithIssuedBooks.forEach((each)=>{
    const book=books.find((a)=>a.id===each.issuedBook);


    book.issuedBy=each.name;
    book.issuedDate=each.issuedDate;
    book.returnDate=each.returnDate;
    
    issuedBook.push(book);
 
   })

   if(issuedBook.length===0){
    return res.status(404).json({
        success:true,
        message:"No books issues by any users"
    })
}
    return res.status(200).json({
        success:true,
        message:"Books issues are:>",
        data:issuedBook
    })
   
   





})



module.exports=Router;