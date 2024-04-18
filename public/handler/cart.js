
export class Cart{
    static addToCart = async(productId) =>{
        const response = await fetch(`http://localhost:3333/api/cart/add/${productId}`);
        const message = await response.json()
        return message
    }

    static deleteCart = async(productId) =>{
        const response = await fetch(`http://localhost:3333/api/cart/clear`)
        const message = await response.json()
        return message
    }
    static removeFromCart = async(productId) =>{
        const response = await fetch(`http://localhost:3333/api/cart/remove/${productId}`);
        const message = await response.json()
        return message
    }


}