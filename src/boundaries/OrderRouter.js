import express from "express";
import * as orderController from "../controllers/OrderController.js"

const orderRouter = express.Router();

// admin xem danh sach tat ca đơn hàng
orderRouter.get(`/`, orderController.getAllOrders)

// người dùng đặt hàng với session
orderRouter.post("/add", orderController.insertOrderWithSession);

//người dùng xem danh sách đơn hàng của mình bằng session
orderRouter.get(`/my-orders`, orderController.getOrderByUsernameWithSession)


//người dùng xem chi tiết đơn  với session
orderRouter.get(`/my-orders/:orderId`, orderController.getOrderDetailsByOrderIdWithSession)



//admin xem chi tiết đơn hàng của đơn hàng
orderRouter.get(`/detail/:orderId`, orderController.getOrderDetailsByOrderId);

//admin cập nhật trạng thái đơn hàng
orderRouter.put(`/:orderId`, orderController.updateOrderStatus);

//admin xóa đơn hàng
orderRouter.delete(`/delete/:orderId`, orderController.deleteOrder);




// //người dùng xem danh sách đơn hàng của mình
// orderRouter.get(`/:username/my-orders`, orderController.getOrderByUsername)

// // người dùng đặt hàng với session
// orderRouter.post("/:username/add", orderController.insertOrder);

// //người dùng xem chi tiết đơn hàng
// orderRouter.get(`/:username/my-orders/:orderId`, orderController.getOrderDetailsByOrderId)

// //admin cập nhật trạng thái đơn hàng
// orderRouter.put(`/:orderId`, orderController.updateOrderStatus);

export default orderRouter;
