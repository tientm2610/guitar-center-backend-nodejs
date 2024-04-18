import express from "express";
import * as cartController from "../controllers/CartController.js";

const cartRouter = express.Router();

// người dùng xem thểm sản phẩm vào giỏ hàng
cartRouter.get(`/add/:productId`, cartController.addToCart);

//xóa toàn bộ giỏ hàng
cartRouter.get(`/clear`, cartController.deleteCart);

//xóa sản phẩm khỏi giỏ hàng
cartRouter.get(`/remove/:productId`, cartController.removeFromCart)




export default cartRouter;