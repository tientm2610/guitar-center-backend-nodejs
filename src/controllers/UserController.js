import User from "../entities/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    throw error
  }
};

export const getUserByUserName = async(req, res) =>{
    const {username} = req.params;
    
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

export const updateUser = async(req, res) =>{
  const loggedInUser = req.session.user;

  const { password,fullname, phone, address, gender, birth } = req.body;  

 // Kiểm tra xem các trường thông tin cập nhật có đầy đủ không
 if (!password || !fullname || !phone || !address || !gender || !birth) {
  return res.status(400).json({ error: "Request body must fill in all information" });
}

// Kiểm tra xem người dùng đã đăng nhập chưa
if (!loggedInUser) {
  return res.status(401).json({ error: "User not logged in" });
}

// Kiểm tra xem người dùng đang cố gắng cập nhật thông tin của người dùng khác
if (loggedInUser.username !== req.params.username) {
  return res.status(403).json({ error: "Cannot update information for another user" });
}
  const userNewData = {   username: loggedInUser.username, password, fullname, phone, address, gender, birth, role :`U` } ;

  try {
  // Gọi hàm updateUserInfor với thông tin người dùng mới
  const updatedUser = await User.updateUserInfor(userNewData);

  // Cập nhật thông tin người dùng trong session
  req.session.user = updatedUser.username;

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
}



