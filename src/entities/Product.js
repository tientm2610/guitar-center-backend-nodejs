import db from "./ConnectToDB.js";

const productColl = db.collection("product");
const orderDetailsColl = db.collection("order-detail");
export default class Product {
  constructor({ productId, productName, unit, price, image, categoryId,description}) {
    this.productId = productId;
    this.productName = productName;
    this.unit = unit;
    this.price = price;
    this.image = image;
    this.categoryId = categoryId;
    this.description = description;
  }

  static getAllProducts = async () => {
    try {
      const allProducts = await productColl.find().toArray();

      const products = allProducts.map((product) => new Product(product));
      return products;
    } catch (error) {
      throw error;
    }
  };

  static getProductById = async (productId) => {
    try {
      const producExist = await productColl.findOne({ productId });
      if (producExist) {

        return new Product(producExist);
      }
    } catch (error) {
      throw error;
    }
  };

  static insertProduct = async (productData) => {
    try {
      const newProduct = await productColl.insertOne(productData);

      return new Product(newProduct);
    } catch (error) {
      throw error;
    }
  };

  static updateProduct = async (productNewData) => {
    try {
      // Lấy productId từ dữ liệu mới
      const { productId } = productNewData;

      // Tạo một object chứa các trường cần cập nhật
      let newproduct = new Product(productNewData);
      // Sử dụng $set để cập nhật các trường chỉ định
      const productUpdate = await productColl.updateOne({ productId: productId }, { $set: newproduct });

      return productUpdate;
      // const productUpdate = await productColl.replaceOne({productId: productNewData.productId},productNewData);

      // return productUpdate;
    } catch (error) {
      throw error;
    }
  };

  static deleteProduct = async(productId) => {
    try {
        await productColl.deleteOne({productId})
    } catch (error) {
        throw error;
    }
  }

  static findByCategory = async(id) =>{
    try {  
      let productInCategory = await productColl.find({ categoryId: id }).toArray();
      const products = productInCategory.map((product) => new Product(product));
  
      return products;
      
    } catch (error) {
     throw error 
    }
  }

  static findByOrderId = async (id) =>{
    try {
      let orderDetailHaveProductId = await orderDetailsColl.find({productId: id}).toArray();
    
      return orderDetailHaveProductId;

    } catch (error) {
      throw error;
    }
  }

  static getProductImage = async(id) =>{
    try {
      let product = await productColl.findOne({productId:id});

      let imageProduct = product.image;
      return imageProduct;
      
    } catch (error) {
      throw error;
    }
  }

}
