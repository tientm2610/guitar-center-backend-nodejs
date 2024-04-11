import express from "express";
import * as productController from "../controllers/ProductController.js";

const productRouter = express.Router();

// người dùng xem danh sach product
productRouter.get("/", productController.getAllProducts);

//người dùng xem chi tiết sản phẩm
productRouter.get(`/:id`, productController.getProductById);

// admin thêm mới san pham
productRouter.post(`/add`, productController.insertProduct);

// admin sửa thông tin san pham
productRouter.put(`/:id`, productController.updateProduct);

// admin xóa  san pham
productRouter.delete(`/:id`,productController.deleteProduct);

export default productRouter;
