import express from "express";
import api from "./src/router.js";
import session from "express-session";
import { fileURLToPath } from 'url';
import { dirname} from 'path';
import cors from "cors";
import PayOS from "@payos/node";



// const dotenv = require('dotenv');
// dotenv.config();
const app = express();

// Middleware để xử lý yêu cầu POST từ frontend
app.use(express.json());

// Cấu hình CORS
app.use(cors({
    origin: (requestOrigin, callback) => {
      callback(null, requestOrigin);
    }, // Cho phép giao tiếp từ nguồn này
    credentials: true // Cho phép gửi cookie (nếu có)
  }));

app.use(session({
    secret: 'abc', // Khóa bí mật để mã hóa session
    resave: false, // Không lưu lại session nếu không có sự thay đổi
    saveUninitialized: false, // Không tạo session cho người dùng chưa đăng nhập
    
}));


// Sử dụng tuyến đường API của sản phẩm
app.use('/api', api);
// lay den thu muc hien tai
 export const __dirname = dirname(fileURLToPath(import.meta.url));


 
// Thông tin cấu hình của kênh thanh toán// Thông tin cấu hình của kênh thanh toán
const payos = new PayOS(
  `7a569ab4-3deb-4976-b672-8c0d1b8138c7`,
  `000a239f-4ffc-41d3-a614-0baa74470b7f`,
  `506283ff88f9b80f616dcda4f218f7615630484f409a207185be4515927ea436`
);

const DOMAIN_FRONTEND = `http://localhost:3001`;

// Xử lý route POST "/create-payment-link"
app.post(`/create-payment-link`, async (req, res) => {
  const cartData = req.body.cartData;

  // Tính toán totalPrice dựa trên cartData
  let totalPrice = 0;
  cartData.forEach((item) => {
    totalPrice += item.price * item.unit;
  });

  // ngày tạo đơn hàng
  const datetime = new Date();
  // mã đơn hàng bằng chuỗi số ngày tháng năm giờ phút giây
  const orderId = `${datetime.getDate()}${datetime.getMonth() + 1}${datetime.getFullYear()}${datetime.getHours()}${datetime.getMinutes()}${datetime.getSeconds()}`;

  const order = {
    amount: totalPrice,
    description: `Thanh toan don hang`,
    orderCode: Number(orderId),
    returnUrl: `${DOMAIN_FRONTEND}/cart?status1=success&message=Thanh toán thành công`,
    cancelUrl: `${DOMAIN_FRONTEND}/cart?status1=cancel&message=Thanh toán đã bị hủy`,
  };

  try {
    const paymentLink = await payos.createPaymentLink(order);
    res.json({ 
      checkoutUrl: paymentLink.checkoutUrl,
      returnUrl: order.returnUrl, // Trả lại returnUrl từ backend
      cancelUrl: order.cancelUrl // Trả lại cancelUrl từ backend
    });
  } catch (error) {
    console.error("Error creating payment link:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server đã khởi động trên cổng ${PORT}`));

export default app;