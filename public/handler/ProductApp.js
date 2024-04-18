import { Product } from './Product.js';

export default class ProductApp {
    constructor(){
       // Gọi hàm loadProduct khi DOM đã tải hoàn toàn
       document.addEventListener('DOMContentLoaded', this.loadProduct.bind(this));
   
    }

        //Tạo các thành phần sản phẩm
     displayProduct = (product) => {
        const productElement = document.createElement('div');
        productElement.classList.add('single-product');
    
        const productImage = document.createElement('div');
        productImage.classList.add('product-f-image');
        const img = document.createElement('img');
        img.src = `http://localhost:3333/api/products/${product.productId}/image`;
        img.alt = product.productName;
        productImage.appendChild(img);
    
        // Add mouseover and mouseout event listeners to each product element
        productImage.addEventListener('mouseover', () => {
            productElement.classList.add('hovered');
        });
    
        productImage.addEventListener('mouseout', () => {
            productElement.classList.remove('hovered');
        });
    
        const productHover = document.createElement('div');
        productHover.classList.add('product-hover');
        const addToCartLink = document.createElement('a');
        addToCartLink.href = '#';
        addToCartLink.classList.add('add-to-cart-link');
        addToCartLink.innerHTML = '<i class="fa fa-shopping-cart"></i> Thêm vào giỏ';
        productHover.appendChild(addToCartLink);
        const viewDetailsLink = document.createElement('a');
        viewDetailsLink.href = 'single-product.html';
        viewDetailsLink.classList.add('view-details-link');
        viewDetailsLink.innerHTML = '<i class="fa fa-link"></i> Xem sản phẩm';
        productHover.appendChild(viewDetailsLink);
    
        productImage.appendChild(productHover);
    
        productElement.appendChild(productImage);
    
        const productName = document.createElement('h2');
        const productLink = document.createElement('a');
        productLink.href = 'single-product.html';
        productLink.textContent = product.productName;
        productName.appendChild(productLink);
        productElement.appendChild(productName);
    
        const productPrice = document.createElement('div');
        productPrice.classList.add('product-carousel-price');
        const price = document.createElement('ins');
        price.textContent = '$' + product.price.toFixed(2);
        productPrice.appendChild(price);
        productElement.appendChild(productPrice);
    
        return productElement;
    };

    //Hiển thị ra danh sách sản phẩm
    loadProduct = async () => {
        try {
            const products = await Product.listProducts();
            const productsContainer = document.getElementById('product-list');
    
            for (const product of products) {
                const productElement = this.displayProduct(product); // Sửa thành this.displayProduct(product)
                productsContainer.appendChild(productElement);
            }
        } catch (error) {
            console.error('Error rendering products:', error);
        }
    };
}

displayProductDetail = (product) => {
     // Tạo phần tử chứa sản phẩm
     const productContainer = document.createElement('div');
     productContainer.classList.add('col-md-8');
     productContainer.id = 'single-product';
 
     // Tạo hàng chứa thông tin sản phẩm
     const productRow = document.createElement('div');
     productRow.classList.add('row');
 
     // Tạo cột chứa hình ảnh sản phẩm
     const imageColumn = document.createElement('div');
     imageColumn.classList.add('col-sm-6');
 
     // Tạo phần tử chứa ảnh chính của sản phẩm
     const productImages = document.createElement('div');
     productImages.classList.add('product-images');
     const productMainImg = document.createElement('div');
     productMainImg.classList.add('product-main-img');
     const imgMain = document.createElement('img');
     img.src = `http://localhost:3333/api/products/${product.productId}/image`;
     imgMain.alt = '';
     productMainImg.appendChild(imgMain);
     productImages.appendChild(productMainImg);
     imageColumn.appendChild(productImages);
 
     // Tạo cột chứa thông tin chi tiết sản phẩm
     const detailColumn = document.createElement('div');
     detailColumn.classList.add('col-sm-6');
 
     // Tạo phần tử chứa thông tin chi tiết sản phẩm
     const productInner = document.createElement('div');
     productInner.classList.add('product-inner');
 
     // Tạo tiêu đề sản phẩm
     const productName = document.createElement('h2');
     productName.classList.add('product-name');
     productName.textContent = 'Đàn ghi ta nhập khẩu từ Nhật'; // Thay đổi tên sản phẩm thực tế
     productInner.appendChild(productName);
 
     // Tạo giá sản phẩm
     const productPrice = document.createElement('div');
     productPrice.classList.add('product-inner-price');
     const insPrice = document.createElement('ins');
     insPrice.textContent = '$700.00'; // Thay đổi giá sản phẩm thực tế
     productPrice.appendChild(insPrice);
     productInner.appendChild(productPrice);
 
     // Tạo form thêm vào giỏ hàng
     const cartForm = document.createElement('form');
     cartForm.classList.add('cart');
     const quantityDiv = document.createElement('div');
     quantityDiv.classList.add('quantity');
     const quantityInput = document.createElement('input');
     quantityInput.type = 'number';
     quantityInput.size = '4';
     quantityInput.classList.add('input-text', 'qty', 'text');
     quantityInput.title = 'Qty';
     quantityInput.value = '1';
     quantityInput.name = 'quantity';
     quantityInput.min = '1';
     quantityInput.step = '1';
     quantityDiv.appendChild(quantityInput);
     cartForm.appendChild(quantityDiv);
     const addToCartButton = document.createElement('button');
     addToCartButton.type = 'submit';
     addToCartButton.classList.add('add_to_cart_button');
     addToCartButton.textContent = 'Thêm vào giỏ hàng';
     cartForm.appendChild(addToCartButton);
     productInner.appendChild(cartForm);
 
     // Tạo tab mô tả sản phẩm
     const tabPanel = document.createElement('div');
     tabPanel.role = 'tabpanel';
     const tabContent = document.createElement('div');
     tabContent.classList.add('tab-content');
     const tabPane = document.createElement('div');
     tabPane.role = 'tabpanel';
     tabPane.classList.add('tab-pane', 'fade', 'in', 'active');
     tabPane.id = 'home';
     const descriptionTitle = document.createElement('h2');
     descriptionTitle.textContent = 'Mô tả sản phẩm';
     tabPane.appendChild(descriptionTitle);
     tabContent.appendChild(tabPane);
     tabPanel.appendChild(tabContent);
     productInner.appendChild(tabPanel);
 
     detailColumn.appendChild(productInner);
     productRow.appendChild(imageColumn);
     productRow.appendChild(detailColumn);
     productContainer.appendChild(productRow);
 
     return productContainer;
}

const main = () => {
    new ProductApp();
  };
  main();
