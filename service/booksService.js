const Book = require("../models/book");
const ApiError = require("../utils/apiUtils/apiError");

async function findBookService(req) {
    const queryObject = {};
    const { bookId, bookName, category, author } = req.query;

    if (bookId) queryObject.bookId = bookId;
    if (bookName) queryObject.bookName = bookName;
    if (category) queryObject.category = category;
    if (author) queryObject.author = author;

    const books = await Book.find(queryObject);
    if (!books.length) return new ApiError("No books found",404);
    return books;

}

async function addBookService(req) {
    const { bookName, category, author, price, imageUrl } = req.body;
    if ((!price || !bookName || !category || !author))
       return new Error(400, "All fields are required");

    const newBook = new Book({ bookName, category, author, price ,imageUrl });
    await newBook.save();
    return  newBook;

}

async function updateBookService(req) {
    const { bookId } = req.params;
    const { bookName, category, author, price, bookImage } = req.body;

    const existingBook = await Book.findById(bookId);
    if (!existingBook) return new ApiError("There is no book with this id!");

    const updatedBook = await Book.findOneAndUpdate({ _id: bookId }, req.body, {new: true});
    return updatedBook;
}

async function deleteBookService(req) {

    const { bookId } = req.params;
    const book = await Book.findOneAndUpdate({ _id: bookId },{isDeleted:new Date.now()});
    if(!book)return new ApiError("No book found");
    return  book;

}

module.exports = { findBookService, addBookService };
