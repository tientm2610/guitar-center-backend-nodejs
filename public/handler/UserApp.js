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
      const loginValidate= await User.login(username,password)
        if(loginValidate !== undefined){
            alert(`Đăng nhập thành công, xin chào ${loginValidate}`)
            window.location.href = 'http://localhost:3333/'
            
            
        }else{
            alert('Dang nhap that bai')
           
        }

    }
    async _onRegister() {
        const username = this._username_register.value;
        const password = this._password_register.value;
        const fullname = this._fullname_register.value;
        const phone = this._phone_register.value;
        const address = this._address_register.value;
        const birth = this._birth_register.value;
        const gender = this._gender_register.value;
    
        // Kiểm tra xem tất cả các trường nhập liệu đã được điền hay chưa
        if (!username || !password || !fullname || !phone || !address || !gender || !birth) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }
    
        // Kiểm tra định dạng số điện thoại
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            alert('Số điện thoại không hợp lệ. Vui lòng nhập lại.');
            return;
        }
    
        // Kiểm tra định dạng ngày sinh
        const birthRegex = /^\d{2}-\d{2}-\d{4}$/;
        if (!birthRegex.test(birth)) {
            alert('Ngày sinh không hợp lệ. Vui lòng nhập lại theo định dạng dd-mm-yyyy.');
            return;
        }
    
        // Gửi yêu cầu đăng ký nếu tất cả thông tin hợp lệ
        try {
            const response = await fetch('http://localhost:3333/api/users/register', {
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
            });
    
            // Xử lý kết quả
            // ...
    
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.');
        }
    }
    

}