import { Cart } from "./Cart.js" 

export default class CartApp {
    constructor() {
        //Lay id
        this._productform = document.querySelector(".product-hover")
        this._btnAdd = this._productform.querySelector("#add-to-cart-link")


        this._addToCart = this._addToCart.bind(this)
        this._btnAdd.addEventListener("click",this._addToCart)


        
    }
    _addToCart()
    {
        const productId = this._btnAdd.getAttribute('data-productId');
        Cart.addToCart(productId)
            .then(message => {
                alert(message);
                window.location.reload();
            })
            .catch(error => console.error(error))
    }
}