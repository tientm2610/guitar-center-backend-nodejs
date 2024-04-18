import { apiRequest } from "./apiRequest.js";

export class Product{

  
    constructor(data){
        this.productId = data.productId;
        this.productName = data.productName;
        this.unit = data.unit;
        this.price = data.price;
        this.image = data.image;
        this.categoryId = data.categoryId;
        this.description = data.description;
    }

    static async listProducts(){
        // const { products } = await apiRequest("GET", "/products");
        const response = await fetch(`http://localhost:3333/api/products`);
        const products = await response.json();
        return products.map((product) => new Product(product));
    }

     getProductDetail= async(productId) =>{
        const {product} = await apiRequest(`GET`, `/products/${productId}`);
        return new Product(product);
    }

    getProductByCategory = async (categoryId) =>{
        const {products} = await apiRequest(`GET`, `/products/category/${categoryId}`);
        return products.map((product) => new Product(product));

    }
    
}
