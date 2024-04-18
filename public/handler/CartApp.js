import { Product } from "./Product.js";
import Cart from "./cart.js"
export default class CartApp{
    
    constructor(){

        this._singleProduct = document.querySelector(`#add_to_cart_button`);
        this._quantity = document.querySelector(`#product-quantity`);
        this._addToCart = this._addToCart.bind(this);
        this._singleProduct.addEventListener(`click`, this._addToCart);
    };

     _addToCart = async () =>{
        const quantity =this._quantity.value;
        const productId = this._singleProduct.getAttribute(`data-productId`);
        const {productName, productPrice, productImage} = await Product.getProductDetail(productId);
       const cartProduct = new CartProduct(productId,productName,productPrice, productImage, quantity);
        await Cart.addToCart(cartProduct)
            .then(message => {
                alert(message);
            })
            .catch(error => console.error(error))
    }

    static getAllProduct = async () => {
        try {
          // Lấy danh sách sản phẩm từ giỏ hàng
          const cartItems = {};
           cartItems = await Cart.getAllFromCart();
    
          // Khởi tạo mảng để lưu trữ thông tin sản phẩm
          const products = [];
    
          // Lặp qua từng sản phẩm trong giỏ hàng
          for (const { productId, quantity } of cartItems) {
            // Lấy thông tin chi tiết của sản phẩm
            const productDetail = await Product.getProductDetail(productId);
    
            // Tạo đối tượng CartProduct từ dữ liệu của sản phẩm và số lượng trong giỏ hàng
            const cartProduct = new CartProduct({
              productId: productDetail.productId,
              productName: productDetail.productName,
              price: productDetail.price,
              image: productDetail.image,
              quantity: quantity
            });
    
            // Thêm sản phẩm vào mảng products
            products.push(cartProduct);
          }
    
          return products; // Trả về danh sách sản phẩm theo class CartProduct
        } catch (error) {
          console.error("Error:", error);
          throw error;
        }
      };
};


export class CartProduct{
    constructor(data){
        this.productId = data.productId;
        this.productName = data.productName;
        this.price = data.price;
        this.image = data.image;
        this.quantity = data.quantity;
    }

};