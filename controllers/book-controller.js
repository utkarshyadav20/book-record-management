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

exports.getSingleBook = async (req, res) => {
  const { id } =  req.params;
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

exports.getAllIssuedBooks=async (req,res)=>{
    
     const userWithIssuedBooks=await UserModel.find({
        issuedBook:{$exists:true},
     }).populate("issuedBook")
     
        if(userWithIssuedBooks.length===0){
         return res.status(404).json({
             success:true,
             message:"No books issues by any users"
         })
     }
         return res.status(200).json({
             success:true,
             message:"Books issues are:>",
             data:userWithIssuedBooks
         })
     
     
}
