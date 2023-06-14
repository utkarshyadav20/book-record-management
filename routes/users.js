const express = require("express");
//JSON data import
const { users } = require('../data/users.json');
const { books } = require('../data/books.json');
const { getAllUsers, getSingleUserById, deleteUser, UpdateUserById, addNewUser, getSubscriptionDetailsById } = require("../controllers/user-controller");

const Router=express.Router();


/*
* Route: /
* Method: GET
* Description: Get all users
* Access: public
* Parameters: None
*/
Router.get("/",getAllUsers);


/*
* Route: /users/:id
* Method: GET
* Description: Get a single user by id
* Access: public
* Parameters: id
*/
Router.get("/:id",getSingleUserById);


/*
* Route: /users
* Method: POST
* Description: Craete a new user
* Access: public
* Parameters: none
*/
Router.post("/",addNewUser);



/*
* Route: /users/:id
* Method: PUT
* Description: Update a user by id
* Access: public
* Parameters: id
*/
Router.put("/:id",UpdateUserById);



/*
* Route: /users/:id
* Method: DELETE
* Description: Delete a user by id
* Access: public
* Parameters: id    
*/
Router.delete("/:id",deleteUser);



/*
* Route: /users/subscription-details/:id
* Method: get
* Description:Get the subscriptoin details of a user
* Access: public
* Parameters: id    
*/
Router.get("/subscription-deatils/:id",getSubscriptionDetailsById)









//default export
module.exports=Router; //we cannot import the routes made by router unless we export it from here{like giving permission to use router used in index.js}

