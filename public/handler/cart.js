
export default class Cart{
    static addToCart = async(productId,quantity) =>{
        const response = await fetch(`http://localhost:3333/api/cart/add/${productId}?quantity=${quantity}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ }),
        });
        const message = await response.json()
        return message
    }

    static deleteCart = async() =>{
        const response = await fetch(`http://localhost:3333/api/cart/clear`)
        const message = await response.json()
        return message
    }
    static removeFromCart = async(productId) =>{
        const response = await fetch(`http://localhost:3333/api/cart/remove/${productId}`);
        const message = await response.json()
        return message
    }

    static getAllFromCart = async () =>{
        const response = await fetch(`http://localhost:3333/api/cart`);
        const res = await response.json();
        return  res;
    }


}