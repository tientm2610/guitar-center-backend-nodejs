import express from "express";
import * as userController from "../controllers/UserController.js";


const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);

//dang ky
userRouter.post(`/register`, userController.createUser);

//dang nhap
userRouter.post(`/`, userController.loginUser);

//get user
userRouter.get(`/:username`,  userController.getUserByUserName);

//update
userRouter.put(`/:username`, userController.updateUser);


export default userRouter;
