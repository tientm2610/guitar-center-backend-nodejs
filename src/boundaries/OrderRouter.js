import express from "express";
import * as orderController from "../controllers/OrderController.js"

const orderRouter = express.Router();

//danh sach product
orderRouter.post("/add", orderController.insertOrder);

//req gui di phải đugns định dạng này 
// {
//     "order":{
//         "address":"21 Hóc Môn",
//         "phone":"01241475143"
//     },
//     "orderDetails": [
//         {
//         "price": "5000",
//         "unit": "3",
//         "productId" : "P01"
//         },{
//         "price": "5000",
//         "unit": "4",
//         "productId" : "M01"
//         }

//     ]
// }

orderRouter.get(`/my-orders`, orderController.getOrderByUsername)

orderRouter.get(`/my-order-details`, orderController.getOrderDetailsByOrderId)


export default orderRouter;
