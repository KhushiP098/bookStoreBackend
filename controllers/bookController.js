const { findBookService,addBookService,deleteBookService,updateBookService } = require("../service/booksService");

async function findBook(req, res) {
  try {
    const findBookApiResponse = await findBookService(req);
    if (!findBookApiResponse.success) throw findBookApiResponse;

    const { statusCode, message, data } = findBookApiResponse;
    return res.status(statusCode).json({
      message,
      success,
      data
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false
    });
  }
}

async function addBook(req, res) {
  try {
    const addBookApiResponse = await addBookService(req);
    if (!addBookApiResponse.success) throw addBookApiResponse;

    const { statusCode, message, data } = addBookApiResponse;
    return res.status(statusCode).json({
      message,
      success,
      data
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false
    });
  }
}

async function updateBook(req, res) {
  try {
    const updateBookApiResponse = await updateBookService(req);
    if (!updateBookApiResponse.success) throw updateBookApiResponse;

    const { statusCode, message, data } = updateBookApiResponse;
    return res.status(statusCode).json({
      message,
      success,
      data
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false
    });
  }
}

async function deleteBook(req, res) {
  try {
    const deleteBookApiResponse = await deleteBookService(req);
    if (!deleteBookApiResponse.success) throw deleteBookApiResponse;

    const { statusCode, message, data } = deleteBookApiResponse;
    return res.status(statusCode).json({
      message,
      success,
      data
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      success: false
    });
  }
}

module.exports = { findBook, addBook,updateBook,deleteBook};
