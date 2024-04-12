import Product from "../entities/Product.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async(req, res) =>{
  const {id} = req.params;

  const product = await Product.getProductById(id);
  if (!product) {
    res.status(404).json({ error: `Product ${id} does not exist` });
  } 
  res.json(product);
}

export const insertProduct = async (req, res) =>{
    try {
        const {productId, productName, unit, price, image, categoryId, description} = req.body;
        const productData = {productId, productName, unit, price, image, categoryId, description} ;
        console.log(productData)
        if (!req.body || !productId || !productName || !unit || !price || !image || !categoryId || !description) {
            return res
              .status(400)
              .json({ error: "Request body must fill in all information" });
          }
          if (!productId) {
            return res.status(400).json({ error: "ProductId cannot be empty" });
          }
          const productExist = await Product.getProductById(productId);
            if (productExist) {
              return res.status(404).json({ error: `Product ${productId} already exists` });
            } 
          await Product.insertProduct(productData)
          res.json({success: true})

    } catch (error) {
        throw error
    }
}

export const updateProduct = async (req, res) =>{
  try {
    const {id} = req.params;
    const productExist = await Product.getProductById(id);
    if (!productExist) {
      return res.status(404).json({ error: `Product ${id} does not exists` });
    } 

    const { productName, unit, price, image, categoryId, description} = req.body;

    const productNewData = {productId:id, productName, unit, price, image, categoryId, description};
    await Product.updateProduct(productNewData)
    res.json({update: true})
  } catch (error) {
    throw error;
  }
}

export const deleteProduct = async(req, res) =>{
  try {
    const {id} = req.params;
    const productExist = await Product.getProductById(id);
    if (!productExist) {
      return res.status(404).json({ error: `Product ${id} does not exists` });
    } 

    const productsInOrder = await Product.findByOrderId(id);
    if(productsInOrder.length > 0){
      return res.status(400).json({ error: `Existing products in an order.` });
    }
    await Product.deleteProduct(id);
    res.json({delete: true});
  } catch (error) {
    throw error;
  }
}; 

export const getProductByCategoryId = async(req, res) =>{
  try {
    const {id} = req.params;
    const productsInCategory = await Product.findByCategory(id);
    if(!productsInCategory){
      res.status(404).json({ error: `Product in category ${id} does not exist` });
    }
    res.json(productsInCategory);
  } catch (error) {
    throw error;
  }
}

import { __dirname } from "../../index.js";
export const getImage = async (req, res) => {
    try {
   
      const {id} = req.params;
      const productExist = await Product.getProductById(id);
      if (!productExist) {
        return res.status(404).json({ error: `Product ${id} does not exists` });
      } 
      const imageProduct = await Product.getProductImage(id);  

      const imagePath =  `${__dirname}/img/${imageProduct}`

      res.sendFile(imagePath);

    } catch (error) {
      throw error;
    }
};

