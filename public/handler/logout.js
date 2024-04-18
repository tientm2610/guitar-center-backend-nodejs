// import User from "./User.js";

// // Lắng nghe sự kiện click trên nút "Logout"
// document.getElementById('btn_logout').addEventListener('click', async () => {
//     try {
//         // Gọi phương thức logout của lớp User
//         await User.logout();
//         // Sau khi đăng xuất thành công, bạn có thể thực hiện các hành động khác, chẳng hạn như chuyển hướng người dùng đến trang đăng nhập hoặc cập nhật giao diện người dùng.
//         // Ví dụ:
//         window.location.href = '/login'; // Chuyển hướng người dùng đến trang đăng nhập sau khi đăng xuất
//     } catch (error) {
//         console.error('Error logging out:', error);
//         // Xử lý lỗi nếu có
//         // Ví dụ: Hiển thị thông báo lỗi cho người dùng
//         alert('Error logging out. Please try again later.');
//     }
// });