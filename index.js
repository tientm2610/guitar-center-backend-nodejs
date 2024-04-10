import express from "express";
import api from "./src/router.js";
import session from "express-session";
// const dotenv = require('dotenv');
// dotenv.config();
const app = express();

app.use(session({
    secret: 'Minhtien1', // Khóa bí mật để mã hóa session
    resave: false, // Không lưu lại session nếu không có sự thay đổi
    saveUninitialized: false, // Không tạo session cho người dùng chưa đăng nhập
    
}));
// Sử dụng tuyến đường API của sản phẩm
app.use('/api', api);


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server đã khởi động trên cổng ${PORT}`));

export default app;