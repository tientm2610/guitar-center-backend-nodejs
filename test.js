import db from "./src/ConnectToDB.js";
    import OrderDetails from "./src/entities/OrderDetails.js";
    import Product from "./src/entities/Product.js";
    import Order from "./src/entities/Order.js";
    const orderDetailsColl = db.collection(`order-detail`);
    const orderColl = db.collection("order");
    const orderId = `1042024211019`;
    // const orderDetailsExist = await orderDetailsColl.find({orderId: orderId,}).toArray();

    //   if (orderDetailsExist) {
    //     console.log(orderDetailsExist) ;
    //   }
  let username = `user2`
    const orderExist = await orderColl.find({username}).toArray();
      const orders = orderExist.map((document)=> new Order(document));
      console.log(orders);

const main = async () => {
  
};
main();
