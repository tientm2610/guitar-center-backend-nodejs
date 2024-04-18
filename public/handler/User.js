import {API_URL, apiRequest} from './apiRequest.js'

export default class User{

    constructor(data) {
        this.username = data.username;
        this.password = data.password;
        this.fullname = data.fullname;
        this.phone = data.phone;
        this.address = data.address;
        this.gender = data.gender;
        this.birth = data.birth;
        this.role = data.role;
    }
    //Đăng nhập
    async login(username,password) {
        await fetch(`http://localhost:3333/api/users/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: username, password: password }),
          });
      
    }

    //Đăng xuất
    async logout(){
         await fetch(`http://localhost:3333/api/users/logout`);
       
    }

    //Cập nhật thông tin người dùng
    async updateInfo(data){
        try {
            const user = {
                username: data.username,
                password: data.password,
                fullname: data.fullname,
                phone: data.phone,
                address: data.address,
                gender: data.gender,
                birth: data.birth,
                role: data.role
            };
    
            const response = await fetch(`http://localhost:3333/api/users/update-info`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
    
            const updatedUserInfo = await response.json();
            Object.assign(this, updatedUserInfo);
        } catch (error) {
            console.error('Error updating user info:', error);
            return null;
        }
    
    }

    // Hiện thông tin người dùng
    async getInfo(){
        const respponse = await fetch(`http://localhost:3333/api/users/me`);
       const user = respponse.json();
        return this(user)
    }

    //Đăng ký tài khoản
    async register(userData) {
        try {
            const response = await fetch('http://localhost:3333/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error registering user:', error);
            return null;
        }
    }
    
}