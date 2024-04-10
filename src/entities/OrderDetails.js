import db from "../ConnectToDB.js";

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
      const orderDetailsExist = await orderDetailsColl.findOne({
        orderId: orderId,
      });

      if (orderDetailsExist) {
        return new OrderDetails(orderDetailsExist);
      }
    } catch (error) {
      throw error;
    }
  };

  static insertOrderDetails = async (orderDetails) => {
    // try {
    //   await orderDetailsColl.insertOne(orderDetailsData);
    //   const orderDetais = new OrderDetails(orderDetailsData);
    //   return orderDetais;
    // } catch (error) {
    //   throw error;
    // }
    try {
      await orderDetailsColl.insertMany(orderDetails);
      const orderDetais = new OrderDetails(orderDetails);
      return orderDetais;
  } catch (error) {
      throw error;
  }
  };

   calculatorTotalPrice() {
    if (this.unit && this.price) {
      return this.unit * this.price;
    } else {
      return 0;
    }
  }
}
