function logoutUser() {
    // Gọi API để logout
    fetch('http://localhost:3333/api/users/logout', {
        method: 'GET',
        credentials: 'include' // Đảm bảo gửi cookie khi sử dụng session
    })
    .then(response => {
        // Kiểm tra xem việc logout thành công hay không
        if (response.ok) {
            // Chuyển hướng hoặc thực hiện các thao tác khác sau khi logout thành công
            window.location.href = '/login'; // Chuyển hướng về trang đăng nhập
        } else {
            console.error('Error logging out:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
}
