import User from "../entities/User.js";

export const getAllUsers = async (req, res) => {

  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    throw error
  }
};

export const getUserByUserNameWithSession = async(req, res) =>{
    const username =   req.session.user;
    // Kiểm tra xem người dùng đã đăng nhập chưa
if (!username) {
  return res.status(401).json({ error: "User not logged in" });
}
    const user = await User.getUserByUsername(username)
    if (!user) {
      res.status(404).json({ error: `Username ${username} does not exist` });
    } 
    res.json(user);
}


export const getUserByUserName = async(req, res) =>{
  const {username} =   req.params;
  // Kiểm tra xem người dùng đã đăng nhập chưa
if (!username) {
return res.status(401).json({ error: "User not logged in" });
}
  const user = await User.getUserByUsername(username)
  if (!user) {
    res.status(404).json({ error: `Username ${username} does not exist` });
  } 
  res.json(user);
}
export const createUser = async (req,res) =>{
  const {  username, password, fullname, phone, address, gender, birth } = req.body;

  if (!req.body || !username || !password || !fullname || !phone || !address || !gender || !birth) {
    return res
      .status(400)
      .json({ error: "Request body must fill in all information" });
  }
  if (!username) {
    return res.status(400).json({ error: "Username cannot be empty" });
  }
  const userExist = await User.getUserByUsername(username)
    if (userExist) {
      return res.status(404).json({ error: `Username ${username} already exists` });
    } 

  const userData = {  username, password, fullname, phone, address, gender, birth, role :`U` } ;

  await User.createUser(userData);
  res.json({success: true})
}

//dùng session
export const updateUserWithSession = async(req, res) =>{
  const username =   req.session.user;

  // Kiểm tra xem người dùng đã đăng nhập chưa
if (!username) {
  return res.status(401).json({ error: "User not logged in" });
}

  const { password,fullname, phone, address, gender, birth } = req.body;  

 // Kiểm tra xem các trường thông tin cập nhật có đầy đủ không
 if (!password || !fullname || !phone || !address  || !birth) {
  return res.status(400).json({ error: "Request body must fill in all information" });
}

  const userNewData = {   username, password, fullname, phone, address, gender, birth, role :`U` } ;

  try {
  // Gọi hàm updateUserInfor với thông tin người dùng mới
  const updatedUser = await User.updateUserInfor(userNewData);

  res.json(updatedUser);
} catch (error) {
    res.status(500).json({ error: "Failed to update user information" });
}

}

//không dùng session
export const updateUser = async(req, res) =>{
  const {username} =   req.params;

  // Kiểm tra xem người dùng đã đăng nhập chưa
if (!username) {
  return res.status(401).json({ error: "User not logged in" });
}

  const { password,fullname, phone, address, gender, birth } = req.body;  

 // Kiểm tra xem các trường thông tin cập nhật có đầy đủ không
 if (!password || !fullname || !phone || !address  || !birth) {
  return res.status(400).json({ error: "Request body must fill in all information" });
}

  const userNewData = {   username, password, fullname, phone, address, gender, birth, role :`U` } ;

  try {
  // Gọi hàm updateUserInfor với thông tin người dùng mới
  const updatedUser = await User.updateUserInfor(userNewData);

  res.json(updatedUser);
} catch (error) {
    res.status(500).json({ error: "Failed to update user information" });
}

}



export const loginUser = async (req,res) =>{
  const { username, password } = req.body;
  if (!username || !password) {

    return res.status(400).json({ error: "Username and password are required" });
  }

  // Kiểm tra xem tài khoản tồn tại và mật khẩu đúng không
  const user = await User.getUserByUsername(username);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const isValidPassword = await user.checkPassword(password);
  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  console.log(`Login succes usename : ${user.username}`)
  req.session.user = user.username;

  res.json(user);
}

export const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ error: 'Failed to logout' });
      }
      res.clearCookie('connect.sid'); // Xóa session cookie
      res.json({ message: 'Logout successful' });
  });
};
