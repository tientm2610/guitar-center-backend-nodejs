import Category from "../entities/Category.js";
import Product from "../entities/Product.js";
export const getAllCategory = async (req, res) =>{
    try {
        const categories = await Category.getAllCategory();
        res.json(categories);
    } catch (error) {
        throw error;
    }
}

export const insertCategory = async (req, res) =>{
    try {
        const {  categoryId, categoryName } = req.body;
        const categoryData = {categoryId, categoryName };
        if (!req.body || !categoryId || !categoryName) {
        return res
        .status(400)
        .json({ error: "Request body must fill in all information" });
        }

        if (!categoryId) {
        return res.status(400).json({ error: "CategoryId cannot be empty" });
        }

        const categoryExist = await Category.getCategoryById(categoryId);
        if (categoryExist) {
        return res.status(404).json({ error: `Category ${categoryId} already exists` });
        } 

        await Category.insertCategory(categoryData);
        res.json({success: true})
    
        
    } catch (error) {
        throw error;
    }
};


export const updateCategory = async (req, res) =>{
    try {
      const {id} = req.params;
      const categoryExist = await Category.getCategoryById(id);
      if (!categoryExist) {
        return res.status(404).json({ error: `Category ${id} does not exists` });
      } 
  
      const { categoryName} = req.body;
      const categoryNewData = {categoryId: id, categoryName};
     
      await Category.updateCategory(categoryNewData);
      res.json({update: true})
    } catch (error) {
      throw error;
    }
  };


  

  export const deleteCategory = async(req, res) =>{
    try {
      const {id} = req.params;
      const categoryExist = await Category.getCategoryById(id);
      if (!categoryExist) {
        return res.status(404).json({ error: `Category ${id} does not exists` });
      } 
      // Kiểm tra xem có sản phẩm nào thuộc về danh mục đó không
      const productsInCategory = await Product.findByCategory(id);
      if (productsInCategory.length > 0) {
          return res.status(400).json({ error: `Existing products in the category ${id}.` });
      }
      await Category.deleteCategory(id)
      res.json({delete: true});
    } catch (error) {
      throw error;
    }
  }; 