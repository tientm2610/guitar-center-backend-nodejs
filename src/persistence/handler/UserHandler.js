const db = require('../ConnectDB');


const getAllUsers = () => {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users`;
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

const insertUser = (userData) => {
    return new Promise((resolve, reject) => {
        // const { id_product, name, unit, price, image, id_category, description } = productData;
        
        const sql = `INSERT INTO users (username, password, fullname, phone_number, address, gender, birth, role_id ) VALUES (?, ?, ?, ?, ?, ?,?,?)`;

        const values = [userData.username, userData.password, userData.fullname, userData.phone_number, userData.address, userData.gender, userData.birth, userData.role_id];

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

const checkLogin = (loginData) => {
    return new Promise((resolve, reject) => {
        // const { id_product, name, unit, price, image, id_category, description } = productData;
        
        const sql = `SELECT * FROM users WHERE username = '${loginData.username}' AND password = '${loginData.password}'`;
        
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    getAllUsers,
    insertUser,
    checkLogin
}