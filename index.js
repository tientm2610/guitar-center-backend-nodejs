import express from "express";
import api from "./src/router.js";
import session from "express-session";
import { fileURLToPath } from 'url';
import { dirname} from 'path';
import path from "path";
import { title } from "process";

// const dotenv = require('dotenv');
// dotenv.config();
const app = express();

app.set('view engine','ejs')
app.set('views','./public/views')


app.get('/', (req,res) => {
    res.render('index')
})

app.get('/index',(req,res)=>{
    res.redirect('/')
})

app.get('/cart',(req,res) =>{
    res.render('cart')
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.get('/checkout',(req,res) => {
    res.render('checkout')
})
app.get('/shop',(req,res) => {
    res.render('shop')
})
app.get('/single-product',(req,res) => {
    res.render('single-product')
})


app.use(session({
    secret: 'Minhtien1', // Khóa bí mật để mã hóa session
    resave: false, // Không lưu lại session nếu không có sự thay đổi
    saveUninitialized: false, // Không tạo session cho người dùng chưa đăng nhập
    
}));





// Sử dụng tuyến đường API của sản phẩm
app.use('/api', api);
// lay den thu muc hien tai
 export const __dirname = dirname(fileURLToPath(import.meta.url));


// Định nghĩa route để phục vụ trang HTML
app.use(express.static('public'));



const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server đã khởi động trên cổng ${PORT}`));

export default app;