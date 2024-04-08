const express = require("express");
const product = express.Router();
const db = require("../../persistence/ConnectDB.js"); // Import cơ sở dữ liệu
const productHandler = require(`../../persistence/handler/ProductHandler.js`);
const bodyParser = require('body-parser');
// Tuyến đường API để truy vấn dữ liệu từ bảng "products"


product.use(bodyParser.json());
product.use(`/`, (req, res, next) => {
    next();

});
product.get(`/`, async (req, res) => {
  const products = await productHandler.getAllProducts(); // Gọi hàm getAllProducts từ ProductHandler.js
  res.json(products);
});

product.get("/:keyword", async (req, res) => {
  let keyword = req.params.keyword;
  const product = await productHandler.getProductByKeyWord(keyword); 
  if(product.length === 0){
    res.status(404).json({ error: `Product ${keyword} does not exist` });
  }else{
    res.json(product);
  }
});

product.post(`/`, async (req, res) => {

    const {  product_name, unit, price, image, category_id, description } = req.body;

    if (!req.body || !product_name) {
      return res
        .status(400)
        .json({ error: "Request body must contain an 'name' property" });
    }
    if (!product_name) {
      return res.status(400).json({ error: "Product name cannot be empty" });
    }
    const productExists = await productHandler.getProductByName(product_name) !== null ;
    console.log(productExists)
    if (productExists) {
      return res.status(400).json({ error: "Product already exists" });
    }

    const productData = {  product_name, unit, price, image, category_id, description };
  
  await productHandler.insertProduct(productData);
    res.json({success : true});
    
})
// Các tuyến đường API khác liên quan đến sản phẩm có thể được thêm ở đây

module.exports = product;
