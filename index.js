const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const api = require(`./api/router.js`)
const app = express();

// Sử dụng tuyến đường API của sản phẩm
app.use('/api', api);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server đã khởi động trên cổng ${PORT}`));