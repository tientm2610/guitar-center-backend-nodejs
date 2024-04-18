import { Cart } from "./cart.js" 

export default class CartApp {
    constructor() {
        //Lay id

        this._btnAdd = document.querySelector("#add-to-cart-link")


        this._addToCart = this._addToCart.bind(this)
        this._btnAdd.addEventListener("click",this._addToCart)


        
    }
    async _addToCart()
    {
        alert('Hello')
        const productId = this._btnAdd.getAttribute('data-productId');
        await Cart.addToCart(productId)
            .then(message => {
                alert(message);
            })
            .catch(error => console.error(error))
    }
}