import { Product } from './Product.js';

// Function to render products on the page
const renderProducts = async () => {
    try {
        const productManager = new Product();
        const products = await productManager.listProducts();
        const productsContainer = document.getElementById('product-list');

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('single-product');

            const productImage = document.createElement('div');
            productImage.classList.add('product-f-image');
            const img = document.createElement('img');
            img.src = `http://localhost:3333/api/products/${product.productId}/image`;
            img.alt = product.productName;
            productImage.appendChild(img);
            productElement.appendChild(productImage);

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
            productElement.appendChild(productHover);

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

            if (productsContainer) {
                productsContainer.appendChild(productElement);
            } else {
                console.error('Parent element not found in the DOM');
            }
        });
    } catch (error) {
        console.error('Error rendering products:', error);
    }
};

// Call the renderProducts function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', renderProducts);
