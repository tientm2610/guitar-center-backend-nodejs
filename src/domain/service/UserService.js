const express = require("express");
const user = express.Router();

const userHandler = require(`../../persistence/handler/UserHandler.js`);
const bodyParser = require('body-parser');
// Tuyến đường API để truy vấn dữ liệu từ bảng "products"


user.use(bodyParser.json());
// user.use(`/`, (req, res, next) => {
//     next();

// });
user.get(`/`, async (req, res) => {
  const users = await userHandler.getAllUsers(); 
  res.json(users);
});

// product.get("/:keyword", async (req, res) => {
//   let keyword = req.params.keyword;
//   const product = await productHandler.getProductByKeyWord(keyword); 
//   if(product.length === 0){
//     res.status(404).json({ error: `Product ${keyword} does not exist` });
//   }else{
//     res.json(product);
//   }
// });

user.post(`/register`, async (req, res) => {

    const {  username, password, fullname, phone_number, address, gender, birth } = req.body;

    if (!req.body || !username) {
      return res
        .status(400)
        .json({ error: "Request body must contain an 'username' property" });
    }
    if (!username) {
      return res.status(400).json({ error: "Username cannot be empty" });
    }
    // const userExists = await userHandler.getProductByName(product_name) !== null ;
    // console.log(userExists)
    // if (productExists) {
    //   return res.status(400).json({ error: "Product already exists" });
    // }

    const userData = {  username, password, fullname, phone_number, address, gender, birth, role_id :1 } ;
  
  await userHandler.insertUser(userData);
    res.json({success : true});
    
})

user.post(`/login`, async(req, res) => {
  const {  username, password } = req.body;
  if (!req.body || !username || !password) {
    return res
      .status(400)
      .json({ error: "Request body must contain an 'username' and 'password' property" });
  };
  if (!username || !password) {
    return res.status(400).json({ error: "Username or password cannot be empty" });
  };
  const loginData = {username, password};
  console.log(loginData);
  await userHandler.checkLogin(loginData);
  res.json({success : true});
})


// Các tuyến đường API khác liên quan đến sản phẩm có thể được thêm ở đây

module.exports = user;
