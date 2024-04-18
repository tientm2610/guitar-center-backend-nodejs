import express from "express";
import api from "./src/router.js";
import session from "express-session";
import { fileURLToPath } from 'url';
import { dirname} from 'path';
import { Product } from "./public/handler/Product.js";
import {CartApp} from "./public/handler/CartApp.js";


// const dotenv = require('dotenv');
// dotenv.config();
const app = express();


app.use(session({
    secret: 'abc', // Khóa bí mật để mã hóa session
    resave: false, // Không lưu lại session nếu không có sự thay đổi
    saveUninitialized: false, // Không tạo session cho người dùng chưa đăng nhập
    
}));

app.set('view engine','ejs')
app.set('views','./public/views')

// Định nghĩa route để phục vụ trang HTML
app.use(express.static('public'));

app.get('/',async (req,res) => {

    try {
        const products = await Product.listProducts();
        res.render('index', { products }); // Truyền danh sách sản phẩm vào trang EJS
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
    
})

app.get('/single-product/:productId', async (req,res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.getProductDetail(productId);
        res.render('single-product',{product});
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
})

app.get('/single-product',(req,res) => {
    res.render('single-product-basic')
})



app.get('/index',(req,res)=>{
    res.redirect('/')
})


app.get('/login', (req,res) => {
    res.render('login')
})

app.get('/checkout',(req,res) => {
    res.render('checkout')
})
app.get('/shop', async (req,res) => {
    const products = await Product.listProducts();
    res.render('shop',{ products })
})

app.get('/single-product',(req,res) => {
    res.render('single-product')
})
app.get('/cart',async (req,res) =>{
    const product = await CartApp.getAllCartProduct();
    console.log(product)
    res.render('cart', {product })
})


// Sử dụng tuyến đường API của sản phẩm
app.use('/api', api);
// lay den thu muc hien tai
 export const __dirname = dirname(fileURLToPath(import.meta.url));


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server đã khởi động trên cổng ${PORT}`));

export default app;