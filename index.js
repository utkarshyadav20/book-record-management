const express = require("express");
const app = express();       //initlizing the server
//JSON data import
const { users } = require('./data/users.json');
const { books } = require('./data/books.json');
//Importing the routes
const usersRouter=require("./routes/users.js");
const booksRouter=require("./routes/books.js");



const PORT = 8081;

app.use(express.json());              //setting the defauult exchange of files as json

app.get("/", (req, res) => {
    res.status(200).json({
        message: "The server is running",
    });
});



app.use("/users",usersRouter);  //request for users redirected to userRouters further to user.js
app.use("/books",booksRouter);









app.get("*", (req, res) => {
    res.status(200).json({
        message: "This route does not exist",
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});