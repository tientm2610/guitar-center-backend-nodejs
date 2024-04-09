import express from "express";
import bodyParser from "body-parser";
import userRouter from "./boundaries/UserRouter.js";
import productRouter from "./boundaries/ProductRouter.js"
import categoryRouter from "./boundaries/CategoryRouter.js"
const api = express.Router();

api.use(bodyParser.json())
// api.use(`/products`, productService); 
api.use(`/users`, userRouter);

api.use(`/products`, productRouter);

api.use(`/categories`, categoryRouter);

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
export default api;