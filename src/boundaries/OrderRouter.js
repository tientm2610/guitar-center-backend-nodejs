import express from "express";
import * as orderController from "../controllers/OrderController.js"

const orderRouter = express.Router();

// admin xem danh sach tat ca đơn hàng
orderRouter.get(`/`, orderController.getAllOrders)

// người dùng đặt hàng
orderRouter.post("/add", orderController.insertOrder);


//req gui di phải đúng định dạng này 
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

//người dùng xem danh sách đơn hàng của mình
orderRouter.get(`/my-orders`, orderController.getOrderByUsername)

//người dùng xem chi tiết đơn hàng
orderRouter.get(`/my-orders/:orderId`, orderController.getOrderDetailsByOrderId)

//admin cập nhật trạng thái đơn hàng
orderRouter.put(`/:orderId`, orderController.updateOrderStatus);

export default orderRouter;
