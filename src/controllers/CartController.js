export const addToCart = async (req, res) => {
  const productId = req.params.productId;
  //kie tra session  co ton tia khong
  if (!req.session.cart) {
    req.session.cart = {};
  }

  //kiem tra sp da ton tai chua
  if (!req.session.cart[productId]) {
    req.session.cart[productId] = 1; // neu chua co them sp moi vao gio hang
  } else {
    req.session.cart[productId]++;
  }
  res.json(`Sản phẩm đã được thêm vào giỏ hàng`);
};

export const deleteCart = async (req, res) => {
  req.session.cart = {};
  res.json(`Giỏ hàng đã được xóa`);
};

export const removeFromCart = async (req, res) => {
  const productId = req.params.productId;
  if (req.session.cart && req.session.cart[productId]) {
    delete req.session.cart[productId]; // xóa sản phẩm  khỏi giỏ hàng
    res.json(`Sản phẩm đã được xóa khỏi giỏ hàng`);
  }
  res.json(`Sản phẩm không tồn tại trong giỏ hàng `);
};
