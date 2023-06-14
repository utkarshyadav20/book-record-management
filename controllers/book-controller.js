const IssuedBook = require("../dtlos/book-dtlos.js");
const { db } = require("../models/book-model.js");
const { BookModel, UserModel } = require("../models/models.js");

exports.getAllBooks = async (req, res) => {
  //you can also use export and import of the functions independently but exporting it directly from here is a much easier way
  const Books = await BookModel.find();
  if (Books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No book found",
    });
  }
  return res.status(200).json({
    success: true,
    data: Books,
  });
};

exports.getSingleBook = async (req, res) => {    //findOne can be used to search the book by 
  const { id } = req.params;
  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "No book exists by the given id",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book found",
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {    //check after making the user model
  const userWithIssuedBooks = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");
  const issuedBooks = userWithIssuedBooks.map((each) => new IssuedBook(each)); //only getting the required data with the help of dto

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: true,
      message: "No books issues by any users",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Books issues are:>",
    data: issuedBooks,
  });
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No data provided",
    });
  }
  const newBook = await BookModel.create(data);

  // const allBooks=await BookModel.find();

  return res.status(200).json({
    success: true,
    message: "Follwing book added:>",
    data: newBook,
  });
};

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updateBook = await BookModel.findOneAndUpdate(
    {
      _id: id, //condition
    },
    data, //data to update
    {
      new: true, //getting the upadted data like prefix and postfix
    }
  );
  return res.status(200).json({
    success: true,
    message: "Book updated",
    data: updateBook,
  });
};

exports.deleteBookById = async (req, res) => {
  const { id } = req.params;
  await BookModel.deleteOne({
    _id:id
  })

  const newBooks = await BookModel.find();
  return res.status(200).json({
    success: true,
    message: "Books after deletion",
    data: newBooks,
  });
};

exports.addNewBookToUser = async (req, res) => {         //check after making the UserModel
  const { bookid } = req.body;
  const { userid } = req.params;     //user to which book is added
  // console.log(userid,bookid)
  const user = await UserModel.findById(userid);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "No user found",
    });
  }
  await UserModel.updateOne(
    { _id: userid},
    { $push: { issuedBook: bookid } }
 )
  
  return res.status(200).json({
    success: true,
    message: "Added new book to a user",
    data: user,
  });
};             
