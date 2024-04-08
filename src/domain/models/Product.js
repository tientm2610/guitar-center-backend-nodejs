class Product {
    constructor(productId, productName, unit, price, image, categoryId, description) {
        this._productIdproductId = productId;
        this._productName = productName;
        this._unit = unit;
        this._price = price;
        this._image = image;
        this._categoryId = categoryId;
        this._description = description;
    }
}

module.exports = Product;