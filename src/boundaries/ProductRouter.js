import express from "express";
import * as productController from "../controllers/ProductController.js";

const productRouter = express.Router();

//danh sach product
productRouter.get("/", productController.getAllProducts);

//lay san pham bang id
productRouter.get(`/:id`, productController.getProductById);

// them san pham
productRouter.post(`/add`, productController.insertProduct);

//sua san pham
productRouter.put(`/:id`, productController.updateProduct);

//delete san pham
productRouter.delete(`/:id`,productController.deleteProduct);

export default productRouter;
