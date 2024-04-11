import express from "express";
import * as categoryController from "../controllers/CategoryController.js";

const categoryRouter = express.Router();

// người dùng xem danh sách category
categoryRouter.get(`/`, categoryController.getAllCategory);

// admin thêm mới category
categoryRouter.post(`/add`, categoryController.insertCategory);

//admin update category
categoryRouter.put(`/:id`, categoryController.updateCategory);

//admin xóa category
categoryRouter.delete(`/:id`, categoryController.deleteCategory);

//người dùng xem product trong category
categoryRouter.get(`/:id`, categoryController.getProductByCategoryId);


export default categoryRouter;