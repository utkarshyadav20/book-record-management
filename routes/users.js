const express = require("express");
//JSON data import
const { users } = require('../data/users.json');
const { books } = require('../data/books.json');

const Router=express.Router();


/*
* Route: /
* Method: GET
* Description: Get all users
* Access: public
* Parameters: None
*/
Router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

/*
* Route: /users/:id
* Method: GET
* Description: Get a single user by id
* Access: public
* Parameters: id
*/

Router.get("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"

        });
    }
    res.status(200).json({
        success:true,
        data:user,
    });
});
/*
* Route: /users
* Method: POST
* Description: Craete a new user
* Access: public
* Parameters: none
*/
Router.post("/",(req,res)=>{
    const {id,name,surname,email,subscriptionType,subscriptionDate}=req.body;
    const a=req.body;
    const user=users.find((each)=>each.id===id);
    if(user){
        return res.status(404).json({
            success:false,
            message:"User existes with this id"
        });
    }
    
    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate
    });    
    return res.status(201).json({
        succes:true,
        message:"User added:>",
        data:a,
    });
});
/*
* Route: /users/:id
* Method: PUT
* Description: Update a user by id
* Access: public
* Parameters: id
*/
Router.put("/:id",(req,res)=>{
    const {id}=req.params;
    const {data}=req.body;
    
    const user=users.find((each)=>each.id===id);
    // console.log(user);

    if(!user){
        return res.status(404).json({
            succes:false,
            messaage:"No user found by given id"
        });
    }
    // const updatedUser=users.map((each)=>{              //map returns a  array whereas find returns a single value
    //     if(each.id===id){
    //         return {
    //             ...each,              //this will modify the values inside the each object from the data object for eg
    //             ...data,             // if you have  a variable with some value in each and the same variable hsa a different value in data the value in each will be overridden by the value in data
    //                                 //and if a variable is not present in each object but is there in data object it will be created newly in each
    //                                 // ... is known as spread operator                                                            
    //         }
    //     }
    //     return each;
    // });
    const index=users.indexOf(user);
    const saperatedUser=users.splice(index,1);
    const saperatedObjectOfuser=saperatedUser[0];
    const updatedUser=Object.assign(saperatedObjectOfuser,data);
    users.push(updatedUser);
    users.sort((obj1,obj2)=>{
         return obj1.id-obj2.id;
    })
    return res.status(200).json({
        succes:true,
        data:updatedUser,
    });
});
/*
* Route: /users/:id
* Method: DELETE
* Description: Delete a user by id
* Access: public
* Parameters: id    
*/
Router.delete("/:id",(req,res)=>{
    const {id}=req.params;
    const user=users.find((each)=>each.id===id);
  if(user && user.issuedBook){
          return res.status(403).json({
            success:false,
            message:"The user you are trying to delete has book with him"
          });
  }     
    if(!user){
        return res.status(404).json({
            succes:false,
            message:"The user you are trying to delete does't exist"
        });
    }
    const index=users.indexOf(user);
    users.splice(index,1);
    return res.status(202).json({
        succes:true,
        data:users,
    })
});
/*
* Route: /users/:id
* Method: DELETE
* Description: Delete a user by id
* Access: public
* Parameters: id    
*/










//default export
module.exports=Router; //we cannot import the routes made by router unless we export it from here{like giving permission to use router used in index.js}

