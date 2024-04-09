import User from "../models/User.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
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
  // const {  username, password, fullname, phone, address, gender, birth } = loggedInUser;
  const { username } = req.params;
  const { password,fullname, phone, address, gender, birth } = req.body;  

  if (!req.body  || !password || !fullname || !phone || !address || !gender || !birth) {
    return res
      .status(400)
      .json({ error: "Request body must fill in all information" });
  }
  if (!username) {
    return res.status(400).json({ error: "Username cannot be empty" });
  }
  const userNewData = {  username: username, password, fullname, phone, address, gender, birth, role :`U` } ;

  try {
  const user =  await User.updateUserInfor(userNewData);
    res.json(user);
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

  res.json(user);
}



