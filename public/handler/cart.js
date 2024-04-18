document.addEventListener("DOMContentLoaded", function() {
    var addToCartButtons = document.querySelectorAll(".add-to-cart-link");

    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();

            // Lấy thông tin sản phẩm từ phần tử cha
            var productContainer = button.closest(".single-product");
            var productName = productContainer.querySelector("h2 a").textContent;
            var productPrice = productContainer.querySelector(".product-carousel-price ins").textContent;

            // Thêm sản phẩm vào Local Storage
            addToCart(productName, productPrice);

            // Cập nhật giao diện giỏ hàng
            updateCartDisplay();
        });
    });

    function addToCart(name, price) {
        // Lấy danh sách sản phẩm đã có từ Local Storage (nếu có)
        var existingCart = JSON.parse(localStorage.getItem("cart")) || [];

        // Thêm sản phẩm mới vào danh sách
        existingCart.push({ name: name, price: price });
        console.log(existingCart);

        // Lưu danh sách sản phẩm mới vào Local Storage
        localStorage.setItem("cart", JSON.stringify(existingCart));
    }

    // Hàm cập nhật giao diện giỏ hàng
    function updateCartDisplay() {
        // Lấy danh sách sản phẩm từ Local Storage
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Hiển thị thông tin sản phẩm trong giỏ hàng
        var cartList = document.getElementById("cart_item");
        cartList.innerHTML = ""; // Xóa bỏ các mục giỏ hàng hiện tại để cập nhật lại

        cart.forEach(function(item) {
            // Tạo phần tử HTML để hiển thị thông tin sản phẩm
            var listItem = document.createElement("li");
            listItem.textContent = item.name + " - " + item.price;
            
            // Thêm sản phẩm vào danh sách hiển thị
            cartList.appendChild(listItem);
        });
    }

    // Gọi hàm hiển thị thông tin sản phẩm trong giỏ hàng khi trang được tải
    updateCartDisplay();
});
