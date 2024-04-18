// Route để thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
  const {productId} = req.params;
  let quantity = req.query.quantity || 1; // Trích xuất giá trị của quantity từ query string, nếu không có thì mặc định là 1
  
  // Kiểm tra xem session có tồn tại giỏ hàng hay chưa
  if (!req.session.cart) {
    req.session.cart = {}; // Nếu không tồn tại, tạo một giỏ hàng mới
  }
  console.log( req.session.cart)
  
  // Thêm sản phẩm vào giỏ hàng trong session
  if (!req.session.cart[productId]) {
    req.session.cart[productId] = parseInt(quantity);
  } else {
    quantity = parseInt(quantity);
    req.session.cart[productId] += quantity;
  }
  
  res.json(`Sản phẩm đã được thêm vào giỏ hàng`);
};

// Route để xóa toàn bộ giỏ hàng
export const deleteCart = async (req, res) => {
  // Xóa toàn bộ giỏ hàng từ session
  req.session.cart = {};
  
  res.json(`Giỏ hàng đã được xóa`);
};

// Route để xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
  const productId = req.params.productId;

  // Kiểm tra xem sản phẩm có tồn tại trong giỏ hàng không
  if (req.session.cart && req.session.cart[productId]) {
    // Xóa sản phẩm khỏi giỏ hàng trong session
    delete req.session.cart[productId];
    res.json(`Sản phẩm đã được xóa khỏi giỏ hàng`);
  } else {
    res.json(`Sản phẩm không tồn tại trong giỏ hàng`);
  }
};

export const getAllProductFromCart = async (req, res) => {
  // Kiểm tra xem session có tồn tại giỏ hàng hay không
  if (!req.session.cart) {
    console.log(req.session.cart);
    res.json([]);
    return;
  }

  // Lấy tất cả các sản phẩm từ giỏ hàng
  const cartItems = Object.keys(req.session.cart).map(productId => {
    return {
      productId: productId,
      quantity: req.session.cart[productId]
    };
  });

  res.json(cartItems);
};
