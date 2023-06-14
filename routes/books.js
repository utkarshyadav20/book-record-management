const express=require("express");
const Router=express.Router();
const { users } = require('../data/users.json');
const { books } = require('../data/books.json');
const { getAllBooks, getSingleBook, getAllIssuedBooks, updateBookById, addNewBookToUser, addNewBook, deleteBookById } = require("../controllers/book-controller");


/*
* Route: /
* Method: GET
* Description: Get all books
* Access: public
* Parameters: None
*/
Router.get("/",getAllBooks);



/*
* Route: /
* Method: POST
* Description: Add a new book in db
* Access: public
* Parameters: None
*/
Router.post("/",addNewBook)



/*
* Route: /books/:id
* Method: GET
* Description: Get a book by id
* Access: public
* Parameters: id
*/
Router.get("/:id",getSingleBook)





/*
* Route: /books/:id
* Method: DELETE
* Description: Delete a book by id
* Access: public
* Parameters: id
*/
Router.delete("/:id",deleteBookById)



/*
* Route: /books/:id
* Method: PUT
* Description: Update a book by id
* Access: public
* Parameters: id
*/
Router.put("/:id",updateBookById)



/*
* Route: /books/issued/by-users
* Method: Get
* Description: Get a list if all the bookks and users
* Access: public
* Parameters: none
*/
Router.get("/issued/by-users",getAllIssuedBooks)



/*
* Route: /books/post/:id
* Method: put
* Description: Adding a new book to a user 
* Access: public
* Parameters: id of the user 
*/
Router.put("/post/:id",addNewBookToUser)


module.exports=Router;