const mysql = require('mysql');
// Kết nối tới cơ sở dữ liệu
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Minhtien1',
    database: 'guitar_center_db'
  });
  
  // Kết nối cơ sở dữ liệu
  db.connect((err) => {
    if (err) {
      console.log(err);
    }
    console.log('MySQL đã được kết nối...');
  });
  
  module.exports = db;