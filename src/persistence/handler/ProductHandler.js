const db = require('../ConnectDB');


const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM product`;
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const getProductByName = (name) =>{
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM product WHERE product_name='${name}'`;
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}


const getProductByKeyWord = (keyword) =>{
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM product WHERE product_name LIKE '%${keyword}%' OR description LIKE '%${keyword}%'`;
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    })
}

// const insertProduct = (productData) => {
//     return new Promise((resolve, reject) => {
//         const { id_product, name, unit, price, image, id_category, description } = productData;
//         const sql = `INSERT INTO product (id_product, name, unit, price, image, id_category, description) VALUES (?, ?, ?, ?, ?, ?, ?)`;
//         const values = [id_product, name, unit, price, image, id_category, description];

//         db.query(sql, values, (err, result) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(result);
//             }
//         });
//     });
// };



// const product = new Product(id_product, name, unit, price, image, id_category, description);
        // const values = [product.id_product, product.name, product.unit, product.price, product.image, product.id_category, product.description];
const insertProduct = (productData) => {
    return new Promise((resolve, reject) => {
        // const { id_product, name, unit, price, image, id_category, description } = productData;
        
        const sql = `INSERT INTO product ( product_name, unit, price, image, category_id, description) VALUES (?, ?, ?, ?, ?, ?)`;

        const values = [productData.product_name, productData.unit, productData.price, productData.image, productData.category_id,productData.description];

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};
module.exports = {
    getAllProducts,
    getProductByKeyWord,
    insertProduct,
    getProductByName
};
