import User from "./User.js";
import { API_URL, apiRequest } from "./apiRequest.js";

export default class UserApp{
    constructor(){
        
        //---------XU LY HANH DONG LOGIN
            //Lấy id
            this._loginform = document.querySelector('#login-form')
            this._username_login = document.querySelector('#username_login')
            this._password_login = document.querySelector('#password_login')    
            this._btnLogin = this._loginform.querySelector('#btn_login')
            //bind
            this._onLogin = this._onLogin.bind(this)

            //Khoi tao event
            this._btnLogin.addEventListener('click',this._onLogin)
            
        
        //---------XU LY HANH DONG REGISTER
            //Lấy id
            this._registerform = document.querySelector('#register-form')


        //Lấy dom từ button

        //Thêm sự kiện -> bind
    }

    //DANG NHAP
    async _onLogin(){
        const username = this._username_login.value
        const password = this._password_login.value
        
        if(!username || !password){
            alert('Please enter username and password')
            return
        }

        // alert(`${username} ${password}`)

        // const res = await fetch(`/`,{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password,
        //     })
        // })

        const res = User.login(username, password);

        if(res !== null){
            alert('Login success')
        }
        else{
            alert('Login failed')
        }


        

    }
    async _onRegister()
    {

    }

}