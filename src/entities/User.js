import db from "./ConnectToDB.js";

const userColl = db.collection("user");

export default class User {
  constructor({username, password, fullname, phone, address, gender, birth, role}) {
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.phone = phone;
    this.address = address;
    this.gender = gender;
    this.birth = birth;
    this.role = role;
  }

  static getAllUsers = async () => {
    try {
     const allUsers = await userColl.find().toArray();

      const users = allUsers.map((user) => new User(user))
        return users;
    } catch (error) {
      throw error;
    }
  }

  static getUserByUsername = async (username) =>{
    
    try {
     // Tìm kiếm người dùng trong cơ sở dữ liệu
     const user = await userColl.findOne({ username });

     // Kiểm tra xem người dùng có tồn tại không
     if (user) {
         // Trả về một đối tượng User mới được tạo từ tài liệu của người dùng
         return new User(user);
     } else {
         // Nếu không tìm thấy người dùng, trả về null hoặc một giá trị tùy ý khác để biểu thị rằng không có người dùng nào được tìm thấy
         return null;
     }
   
    } catch (error) {
      throw error
    }
  
  }

  static createUser = async (userData) =>{
    
    try {
       await userColl.insertOne(userData);

      const user = new User(userData);

      return user; 
    } catch (error) {
      throw error;
    }
  }

   checkPassword = async(password) =>{
     // Lấy người dùng từ cơ sở dữ liệu dựa trên tên người dùng
     const user = await userColl.findOne({ username: this.username });
     if (!user) {
       throw new Error('User not found');
     }
 
     // So sánh mật khẩu được cung cấp với mật khẩu đã lưu trữ trong cơ sở dữ liệu
     if (user.password !== password) {
       return false; // Mật khẩu không khớp
     }
 
     return true; // Mật khẩu khớp
  }

 static updateUserInfor = async(user) => {
     
     await userColl.updateOne({ username: user.username }, {$set: user});
    const userUpdate = await this.getUserByUsername(user.username);
 
    return new User(userUpdate);
}

}
