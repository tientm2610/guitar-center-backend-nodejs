import db from "./ConnectToDB.js";

const categoryColl = db.collection("category");

export default class Category {
  constructor({ categoryId, categoryName }) {
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }

  static getAllCategory = async () => {
    try {
      const allCategories = await categoryColl.find().toArray();
      const categories = allCategories.map((category) => new Category(category));
      return categories;
    } catch (error) {
      throw error;
    }
  };

  // static getCategoryById = async (categoryId) => {
  //   try {
  //     const categoryExist = await categoryColl.findOne({ categoryId });
  
  //     if (categoryExist) {
        
  //       return new Category(categoryExist);
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  static insertCategory = async (categoryData) => {
    try {
      await categoryColl.insertOne(categoryData);
      const category = new Category(categoryData);
      return category;
    } catch (error) {
      throw error;
    }
  };

  static updateCategory = async (categoryData) => {
    try {
      const id = categoryData.categoryId;
      await categoryColl.replaceOne({ categoryId: id }, categoryData);
      const categoryUpdate = await categoryColl.findOne({ id });
      return categoryUpdate;
    } catch (error) {
      throw error;
    }
  };

  static deleteCategory = async (categoryId) => {
    try {
      await categoryColl.deleteOne({ categoryId });
    } catch (error) {
      throw error;
    }
  };
}
