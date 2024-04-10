import Order from "../entities/Order.js";
import OrderDetails from "../entities/OrderDetails.js";

export const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.getAllOrders();
        res.json(orders);      
    } catch (error) {
        throw error;
    };
};

export const getOrderByUsername = async (req, res) =>{
    const username = req.session.user;  
    try {
        const orders = await Order.getOrderByUsername(username);
        res.json(orders)
    } catch (error) {
        throw error;
    }
}

// export const getOrderDetailsByOrderId = async (req, res) =>{
//     try {
//         const orderDetails = await OrderDetails.getOrderDetailsByOrderId()
//     } catch (error) {
//         throw error;
//     }
// }

export const insertOrder = async (req, res) => {
    const { order, orderDetails } = req.body;

    // lấy username đang đăng nhập được lưu trong session
    const username = req.session.user; 

    // orderDetails phải là một mảng
    if (!orderDetails || !Array.isArray(orderDetails)) {
        return res.status(400).json({ error: "orderDetails must be an array" });
    }
    
    // kiểm tra login
    if (!username) {
        return res.status(400).json({ error: "User not logged in" });
    }

    // phân rã từ order trong body
    const address = order.address;
    const phone = order.phone;

    // ngày tạo đơn hàng
    const orderDate = new Date();
    // mã đơn hàng bằng chuỗi số ngày tháng năm giờ phút giây
    const orderId = `${orderDate.getDate()}${orderDate.getMonth() + 1}${orderDate.getFullYear()}${orderDate.getHours()}${orderDate.getMinutes()}${orderDate.getSeconds()}`;

    // lặp qua mảng  orderDetails để thêm mã đơn hàng cho mỗi orderDetail
    const parsedOrderDetails = orderDetails.map((detail) => {
        const { price, unit, productId } = detail;
        return { price, unit, orderId, productId };
    });
    // cho trạng thái đơn hàng mới đặt là đang xử lý
    const status = `Đang xử lý`;

    const totalPrice = parsedOrderDetails.reduce((total, detail) => {
        // Lấy giá và số lượng từ mỗi chi tiết sản phẩm
        const price = detail.price;
        const unit = detail.unit;
        
        // Tính tổng giá tiền của sản phẩm hiện tại và cộng vào tổng
        const productTotalPrice = price * unit;
        return total + productTotalPrice;
    }, 0);
    // đưa các giá trị vừa hoàn thành vào orderData
    const orderData = { orderId, address, orderDate, phone, status, totalPrice, username };

    try {
        await Order.insertOrder(orderData);

        // Chuyển parsedOrderDetails thành một mảng các tài liệu để chèn vào cơ sở dữ liệu
        const orderDetailsToInsert = parsedOrderDetails.map(detail => new OrderDetails(detail));

        // Chèn các orderDetails vào cơ sở dữ liệu
        await OrderDetails.insertOrderDetails(orderDetailsToInsert);

        res.json({ insertOrder: true });
    } catch (error) {
        throw error;
    }
};

