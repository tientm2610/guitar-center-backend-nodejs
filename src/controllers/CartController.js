// Khởi tạo biến toàn cục để lưu trữ giỏ hàng
let cart = {};

export const addToCart = async (req, res) => {
  const productId = req.params.productId;
  let quantity = req.query.quantity || 1; // Số lượng mặc định là 1 nếu không được chỉ định

  // Chuyển đổi quantity từ string sang số nguyên
  quantity = parseInt(quantity);

  // Kiểm tra số lượng hợp lệ
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Số lượng không hợp lệ" });
  }

  // Thêm sản phẩm vào giỏ hàng
  if (!cart[productId]) {
    cart[productId] = quantity;
  } else {
    cart[productId] += quantity;
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

  // Xóa sản phẩm khỏi giỏ hàng
  delete cart[productId];

  res.json(`Sản phẩm đã được xóa khỏi giỏ hàng`);
};
