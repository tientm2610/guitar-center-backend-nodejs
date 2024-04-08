const express = require('express');
const api = express.Router();
const productService = require(`./domain/service/ProductService.js`);
const userService = require(`./domain/service/UserService.js`);

api.use(`/products`, productService); 
api.use(`/users`, userService);

api.all("/*", (req, res) => {
    let data = {
      method: req.method,
      path: req.url,
      query: req.query,
      body: req.body,
    };
    console.log(data);
    res.status(500).json({ error: "Not implemented" });
  });
module.exports = api;
