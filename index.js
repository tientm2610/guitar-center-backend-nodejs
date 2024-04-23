import express from "express";
import api from "./src/router.js";
import session from "express-session";
import { fileURLToPath } from 'url';
import { dirname} from 'path';
import cors from "cors";



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


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server đã khởi động trên cổng ${PORT}`));

export default app;