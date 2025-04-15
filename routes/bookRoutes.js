const express = requires("express");
const bookRouter = express.Router();


bookRouter.get("/findBook", findBook); 
bookRouter.post("/addBook", isAdmin, addBook);
bookRouter.update("/updateBook/:bookId", isAdmin, updateBook);
bookRouter.delete("/deleteBook/:bookId", isAdmin, deleteBook);

module.exports = bookRouter;
