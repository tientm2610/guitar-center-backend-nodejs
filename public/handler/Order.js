import { apiRequest } from "./apiRequest.js";


export class OrderDetail{
    constructor(data){
        this.price = data.price;
        this.unit = data.unit;
        this.orderId = data.orderId;
        this.productId = data.productId;
    }
}
export class Order{
    
    constructor(data){
        this.orderId = data.orderId;
        this.address = data.address;
        this.orderDate = data.orderDate;
        this.phone = data.phone;
        this.status = data.status;
        this.totalPrice = data.totalPrice;
        this.username = data.username;
    }

     listOrder = async() => {
        try {
            let {orders} = await apiRequest("GET", "/orders/");

            return orders.map((order) => new Order(order));
       
        } catch (error) {
            alert('Error fetching orders:', error);
            return [];
        }
        
    }

    createOrder = async (orderData, orderDetailsData) => {
        try {
            const requestData = {
                order: orderData,
                orderDetails: orderDetailsData
            };
            const response = await apiRequest(`POST`, `/orders/add`, requestData);
            return response;
        } catch (error) {
            alert('Error creating order:', error);
            return null;
        }
    }

    getOrderList = async() => {
        try {
            const {orders} =  await apiRequest(`GET`, `/orders/my-orders`);
            return orders.map((order) => new Order(order));
        } catch (error) {
            alert('Error fetch order:', error);
            return null;
        }
       
    }

    getOrderDetailList = async (orderId) => {
        try {
            const {orderDetails} = await apiRequest(`GET`, `/my-orders/${orderId}`);
            return orderDetails.map((orderDetail) => new OrderDetail(orderDetail));
        } catch (error) {
            alert('Error fetch order detail:', error);
            return null;
        }
    }

    
};