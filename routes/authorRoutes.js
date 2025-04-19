const express = require("express");
const AuthorRouter = express.Router();

AuthorRouter.get("/author/:authorId", getAuthor);
AuthorRouter.post("/author/:authorId",isAdmin, updateAuthor);
AuthorRouter.delete("/author/:authorId",isAdmin, deleteAuthor);

module.exports = AuthorRouter;
