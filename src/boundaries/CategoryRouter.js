import express from "express";
import * as categoryController from "../controllers/CategoryController.js";

const categoryRouter = express.Router();

// get all
categoryRouter.get(`/`, categoryController.getAllCategory);

//them category
categoryRouter.post(`/add`, categoryController.insertCategory);

//sua category
categoryRouter.put(`/:id`, categoryController.updateCategory);

//xoa category
categoryRouter.delete(`/:id`, categoryController.deleteCategory);



export default categoryRouter;