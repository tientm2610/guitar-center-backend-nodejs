import {API_URL, apiRequest} from "./apiRequest.js";

export default class User{

    //Đăng nhập
    async login(username,password) {
        const res = await apiRequest('POST','/users',{
            username: username,
            password: password,
        })
    
        return res
    }
    //Đăng xuất
    async logout(){
        const res = await apiRequest('GET','users/logout');
        return res;
    }

    //Cập nhật thông tin người dùng
    async updateInfo(data){
        const res = await apiRequest('POST','/users/update-info',{
            password: data.password,
            fullname: data.fullname,
            phone: data.phone,
            address: data.address,
            gender: data.gender,
            birth: data.birth,
            role: data.role
        });
        return json
    }

    // Hiện thông tin người dùng
    async getInfo(){
        const res = await apiRequest('GET','/users/me');
        return res;
    }

    //Đăng ký tài khoản
    async register(data){
        const res = await apiRequest('POST','/users/register',{
            username: data.username,
            password: data.password,
            fullname: data.fullname,
            phone: data.phone,
            address: data.address,
            gender: data.gender,
            birth: data.birth
        })
        return res;
    }
}