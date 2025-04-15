const Book = require("../models/book");
const ApiError = require("../utils/apiUtils/apiError");
const ApiResponse = require("../utils/apiUtils/apiResponse");

async function findBookService(req) {
  try {
    const queryObject = {};
    const { bookId, bookName, category, author } = req.query;

    if (bookId) queryObject.bookId = bookId;
    if (bookName) queryObject.bookName = bookName;
    if (category) queryObject.category = category;
    if (author) queryObject.author = author;

    const books = await Book.find(queryObject);
    if (!books.length) return new ApiError(404, "No books");
  } catch (error) {
    return new ApiError(400, error.message);
  }
}

async function addBookService(req) {
  try {
    const { bookName, category, author, price, bookImage } = req.body;
    if ((!price, !bookName, !category, !author))
      return new ApiError(400, "All fields are required");

    // upload the image on the cloudinary and get the url
    const newBook = new Book({ bookName, category, author, price });
    await newBook();
    return new ApiResponse(200, "New Book added", newBook);
  } catch (error) {
    return new ApiError(400, error.message);
  }
}

async function updateBookService(req) {
  try {
    const { bookId } = req.params;
    const { bookName, category, author, price, bookImage } = req.body;

    const existingBook = await Book.findById(bookId);
    if (!existingBook) return new ApiError("There is no book with this id!");

    const updatedBook = await Book.findOneAndUpdate({ _id: bookId }, req.body, {
      new: true
    });
    return new ApiResponse(200, " Book updated!", updatedBook);
  } catch (error) {
    return new ApiError(400, error.message);
  }
}

async function deleteBookService(req) {
  try {
    const { bookId } = req.params;
    const book = await Book.findOneAndDelete({ _id: bookId });
    return new ApiResponse(200, " Book deleted!", book);
  } catch (error) {
    return new ApiError(400, error.message);
  }
}

module.exports = { findBookService, addBookService };
