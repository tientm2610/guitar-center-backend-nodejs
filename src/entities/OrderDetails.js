import db from "./ConnectToDB.js";

const orderDetailsColl = db.collection("order-detail");

export default class OrderDetails {
  constructor({ price, unit, orderId, productId }) {
    this.price = price;
    this.unit = unit;
    this.orderId = orderId;
    this.productId = productId;
  }

  static getOrderDetailsByOrderId = async (orderId) => {
    try {
      const orderDetailDocuments = await orderDetailsColl.find({orderId}).toArray();
      const orderDetails = orderDetailDocuments.map((orderdetail) =>  new OrderDetails(orderdetail));
      return orderDetails;
    } catch (error) {
      throw error;
    }
  };

  static insertOrderDetails = async (orderDetails) => {
    try {
      await orderDetailsColl.insertMany(orderDetails);
      const orderDetais = new OrderDetails(orderDetails);
      return orderDetais;
  } catch (error) {
      throw error;
  }
  };

}
