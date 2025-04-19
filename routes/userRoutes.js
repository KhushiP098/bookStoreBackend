const express = require("express");
const userRouter = express.Router();

userRouter.get("/user",isAdmin, findUser);
userRouter.post("/user",userAuth,updateUser);
userRouter.delete("/user/:userId",userAuth, deleteUser);

module.exports = userRouter;
