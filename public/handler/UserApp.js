import User from "./User.js";

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
            this._username_register = this._registerform.querySelector('#username_register')
            this._password_register = this._registerform.querySelector('#password_register')
            this._fullname_register = this._registerform.querySelector('#fullname_register')
            this._phone_register = this._registerform.querySelector('#phone_register')
            this._address_register = this._registerform.querySelector('#address_register')
            this._gender_register = this._registerform.querySelector('input[name="gender"]:checked')
            this._birth_register = this._registerform.querySelector('#birth_register')
            this._btnsignup = this._registerform.querySelector('#btn_signup')
       

            //Thêm sự kiện -> bind
            this._onRegister = this._onRegister.bind(this)

            //Thêm sự kiện cho button sign up
            this._btnsignup.addEventListener('click',this._onRegister)
    }

    //DANG NHAP
    async _onLogin(){
        const username = this._username_login.value
        const password = this._password_login.value
        
        if(!username || !password){
            alert('Please enter username and password')
            return
        }

        const res = await fetch('http://localhost:3333/api/users/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })

        if(res.status == 200){
            alert('Dang nhap thanh cong')
            window.location.href = 'http://localhost:3333/index.html'
        }
        else
        {
            alert('Dang nhap that bai')
        }

    }
    async _onRegister()
    {
        //Lay thong tin gan vao bien
        const username = this._username_register.value
        const password = this._password_register.value
        const fullname = this._fullname_register.value
        const phone = this._phone_register.value
        const address = this._address_register.value
        const gender = this._gender_register.value
        const birth = this._birth_register.value

        //Kiem tra thong tin
        if(!username || !password || !fullname || !phone || !address || !gender || !birth){
            alert('Vui lòng nhập đầy đủ thông tin')
        }

        const res = await fetch(`http://localhost:3333/api/users/register`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                fullname: fullname,
                phone: phone,
                address: address,
                gender: gender,
                birth: birth
            })
        })

        alert(`${res.body()}`)


    }

}