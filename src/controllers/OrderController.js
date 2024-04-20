import Order from "../entities/Order.js";
import OrderDetails from "../entities/OrderDetails.js";

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAllOrders();
        res.json(orders);      
    } catch (error) {
        throw error;
    };
};
//dùng session
export const getOrderByUsernameWithSession = async (req, res) =>{
    const username = req.session.user;  
    console.log(username)
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }
    try {
        const orders = await Order.getOrderByUsername(username);
        res.json(orders)
    } catch (error) {
        throw error;
    }
}
//không dùng session
export const getOrderByUsername = async (req, res) =>{
    const {username} = req.params;  
    console.log(username)
    if (!username) {
      return res.status(401).json({ error: "User not logged in" });
    }
    try {
        const orders = await Order.getOrderByUsername(username);
        res.json(orders)
    } catch (error) {
        throw error;
    }
}

export const getOrderDetailsByOrderIdWithSession = async (req, res) =>{
    const username = req.session.user; 
    const {orderId} = req.params

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!username) {
    return res.status(401).json({ error: "User not logged in" });
    }
    
    try {
      
        const orderDetails = await OrderDetails.getOrderDetailsByOrderId(orderId)
        if(orderDetails.length > 0){
           return res.json(orderDetails);
        }else{
            return res.status(401).json({ error: "Orderdetail does not exist" });
        }

       
    } catch (error) {
        throw error;
    }
}

export const getOrderDetailsByOrderId = async (req, res) =>{
    const {username} = req.params;
    const {orderId} = req.params

    // Kiểm tra xem người dùng đã đăng nhập chưa
    if (!username) {
    return res.status(401).json({ error: "User not logged in" });
    }
    
    try {
      
        const orderDetails = await OrderDetails.getOrderDetailsByOrderId(orderId)
        if(orderDetails.length > 0){
           return res.json(orderDetails);
        }else{
            return res.status(401).json({ error: "Orderdetail does not exist" });
        }

       
    } catch (error) {
        throw error;
    }
}


export const insertOrderWithSession = async (req, res) => {
    const { order, orderDetails } = req.body;

    // lấy username đang đăng nhập được lưu trong session
    const username = req.session.user; 

    // orderDetails phải là một mảng
    if (!orderDetails || !Array.isArray(orderDetails)) {
        return res.status(401).json({ error: "orderDetails must be an array" });
    }
    
    // kiểm tra login
    if (!username) {
        return res.status(400).json({ error: "User not logged in" });
    }

    // phân rã từ order trong body
    const {address, phone} = order;

  // ngày tạo đơn hàng
 const datetime = new Date()
 const orderDate = `${datetime.getDate()}-${datetime.getMonth() + 1}-${datetime.getFullYear()}, ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;

    // mã đơn hàng bằng chuỗi số ngày tháng năm giờ phút giây
    const orderId = `${datetime.getDate()}${datetime.getMonth() + 1}${datetime.getFullYear()}${datetime.getHours()}${datetime.getMinutes()}${datetime.getSeconds()}`;

    // lặp qua mảng  orderDetails để thêm mã đơn hàng cho mỗi orderDetail
    const orderDetailHaveOrderId = orderDetails.map((detail) => {
        const { price, unit, productId } = detail;
        return { price, unit, orderId, productId };
    });
    // cho trạng thái đơn hàng mới đặt là đang xử lý
    const status = `Đang xử lý`;

    let totalPrice = 0;

    for (const detail of orderDetailHaveOrderId) {
        const price = detail.price;
        const unit = detail.unit;
        
        // Tính tổng giá tiền của sản phẩm hiện tại và cộng vào tổng
        const productTotalPrice = price * unit;
        totalPrice += productTotalPrice;
    }

    const orderData = { orderId, address, orderDate, phone, status, totalPrice, username };

    try {
        await Order.insertOrder(orderData);

        // Chuyển parsedOrderDetails thành một mảng các tài liệu để chèn vào cơ sở dữ liệu
        const orderDetailsToInsert = orderDetailHaveOrderId.map(detail => new OrderDetails(detail));

        // Chèn các orderDetails vào cơ sở dữ liệu
        await OrderDetails.insertOrderDetails(orderDetailsToInsert);

        res.json({ insertOrder: true });
    } catch (error) {
        throw error;
    }
};

export const insertOrder = async (req, res) => {
    const { order, orderDetails } = req.body;

    // lấy username đang đăng nhập được lưu trong session
    const {username} = req.params; 

    // orderDetails phải là một mảng
    if (!orderDetails || !Array.isArray(orderDetails)) {
        return res.status(400).json({ error: "orderDetails must be an array" });
    }
    
    // kiểm tra login
    if (!username) {
        return res.status(400).json({ error: "User not logged in" });
    }

    // phân rã từ order trong body
    const {address, phone} = order;
 // ngày tạo đơn hàng
 const datetime = new Date()
 const orderDate = `${datetime.getDate()}-${datetime.getMonth() + 1}-${datetime.getFullYear()}, ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;

 // mã đơn hàng bằng chuỗi số ngày tháng năm giờ phút giây
 const orderId = `${datetime.getDate()}${datetime.getMonth() + 1}${datetime.getFullYear()}${datetime.getHours()}${datetime.getMinutes()}${datetime.getSeconds()}`;

    // lặp qua mảng  orderDetails để thêm mã đơn hàng cho mỗi orderDetail
    const orderDetailHaveOrderId = orderDetails.map((detail) => {
        const { price, unit, productId } = detail;
        return { price, unit, orderId, productId };
    });
    // cho trạng thái đơn hàng mới đặt là đang xử lý
    const status = `Đang xử lý`;

    let totalPrice = 0;

    for (const detail of orderDetailHaveOrderId) {
        const price = detail.price;
        const unit = detail.unit;
        
        // Tính tổng giá tiền của sản phẩm hiện tại và cộng vào tổng
        const productTotalPrice = price * unit;
        totalPrice += productTotalPrice;
    }

    const orderData = { orderId, address, orderDate, phone, status, totalPrice, username };

    try {
        await Order.insertOrder(orderData);

        // Chuyển parsedOrderDetails thành một mảng các tài liệu để chèn vào cơ sở dữ liệu
        const orderDetailsToInsert = orderDetailHaveOrderId.map(detail => new OrderDetails(detail));

        // Chèn các orderDetails vào cơ sở dữ liệu
        await OrderDetails.insertOrderDetails(orderDetailsToInsert);

        res.json({ insertOrder: true });
    } catch (error) {
        throw error;
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const {orderId} = req.params;
        const {status} = req.body;
        const orderExist = await Order.getOrderById(orderId);
        if (!req.body || !status ) {
            return res
              .status(400)
              .json({ error: "Request body must fill status information" });
          }
        if(!orderExist){
            return res.status(404).json({ error: `Order ${orderId} does not exists` })
        }
      
        const {address, phone, totalprice, username} = orderExist;
        const orderNewData = {orderId, address, phone, status, totalprice, username };
        await Order.updateStatusOrder(orderNewData);
        res.json({update: true})
    } catch (error) {
        throw error;
    }
}

