import db from "../database/ConnectToDB.js";

const productColl = db.collection("product");

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
      const documents = await productColl.find().toArray();

      const products = documents.map((document) => new Product(document));
      return products;
    } catch (error) {
      throw error;
    }
  };

  static getProductById = async (productId) => {
    try {
      const producExist = await productColl.findOne({ productId });
      console.log(producExist);
      if (producExist) {
        let document = await productColl.findOne({ productId });

        return new Product(document);
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
      console.log(newproduct);
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

}
