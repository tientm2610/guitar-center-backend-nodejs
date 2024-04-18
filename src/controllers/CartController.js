// Khởi tạo biến toàn cục để lưu trữ giỏ hàng
let cart = {};

export const addToCart = async (req, res) => {
  const productId = req.params.productId;

  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  if (!cart[productId]) {
    cart[productId] = 1;
  } else {
    cart[productId]++;
  }

  res.json(`Sản phẩm đã được thêm vào giỏ hàng`);
};

export const deleteCart = async (req, res) => {
  // Xóa toàn bộ giỏ hàng
  cart = {};
  res.json(`Giỏ hàng đã được xóa`);
};

export const removeFromCart = async (req, res) => {
  const productId = req.params.productId;

  if (cart[productId]) {
    delete cart[productId];
    res.json(`Sản phẩm đã được xóa khỏi giỏ hàng`);
  } else {
    res.json(`Sản phẩm không tồn tại trong giỏ hàng`);
  }
};
