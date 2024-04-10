import db from "./src/ConnectToDB.js";
    import OrderDetails from "./src/entities/OrderDetails.js";
    import Product from "./src/entities/Product.js";
    
    
    const orderColl = db.collection("order");
   function insertOrderDetails(orderDetailsData) {
        orderDetailsData.forEach((detail) => {
          const { orderDetailId, price, unit, productId } = detail;
          const orderDetail = new OrderDetails({ orderDetailId, price, unit, orderId: this.orderId, productId });
    
          // Thêm sản phẩm vào chi tiết đơn hàng
          const product = new Product(detail.product);
          orderDetail.addProduct(product, unit);
    
          // Thêm chi tiết đơn hàng vào đơn hàng
          this.orderDetails.push(orderDetail);
        });
      }

const main = async () => {
  
};
main();
