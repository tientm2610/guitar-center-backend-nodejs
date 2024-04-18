import { API_URL, apiRequest } from './apiRequest.js';

export default class Category{
    
    // Hiển thị danh sách category
    async getAllCategories(){
        const res = await apiRequest('GET','/categories');
        return res
    }

    //Người dùng xem sản phẩm trong category
    async getCategoriesById(id){
        const res = await apiRequest('GET','/categories/${id}');
    }
}