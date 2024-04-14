import express from "express";
import * as userController from "../controllers/UserController.js";


const userRouter = express.Router();

//get all
userRouter.get("/", userController.getAllUsers);

//người dùng đăng ký tài khoản
userRouter.post(`/register`, userController.createUser);

// người dùng đăng nhập
userRouter.post(`/`, userController.loginUser);

// người dùng đăng xuất
userRouter.get(`/logout`, userController.logoutUser);

// sau khi đăng nhập sẽ hiện thông tin người dùng bằng session
userRouter.get(`/me`,  userController.getUserByUserNameWithSession);
// sau khi đăng nhập sẽ hiện thông tin người dùng bằng params
userRouter.get(`/:username`, userController.getUserByUserName)

//người dùng chỉnh sửa thông tin hoặc thay đổi mật khẩu, có session
userRouter.put(`/:username/update-infor`, userController.updateUser);



export default userRouter;
