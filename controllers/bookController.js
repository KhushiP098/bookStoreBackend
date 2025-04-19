const { findBookService, addBookService, deleteBookService, updateBookService } = require("../service/booksService");

async function findBook(req, res) {
  try {
    const response = await findBookService(req);
    return res.status(statusCode).json({ success: true, data: response });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message, success: false });
  }
}

async function addBook(req, res) {
  try {
    const response = await addBookService(req);
    return res.status(statusCode).json({ success: true, data: response });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message, success: false });
  }
}

async function updateBook(req, res) {
  try {
    const response = await updateBookService(req);
    return res.status(statusCode).json({ success: true, data: response });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message, success: false });
  }
}

async function deleteBook(req, res) {
  try {
    const response = await deleteBookService(req);
    return res.status(statusCode).json({ success: true, data: response });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ message: error.message, success: false });
  }
}

module.exports = { findBook, addBook, updateBook, deleteBook };
