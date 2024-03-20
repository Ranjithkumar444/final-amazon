import {cart , addToCart} from "../data/cart.js"
import {products} from "../data/products.js";
import { currencyformat } from "./utils/currency.js";

  let productsHTML = '';
  
  products.forEach((product) => {
    productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>
  
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
  
      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-countlink-primary">
            ${product.rating.count}
        </div>
      </div>
  
      <div class="product-price">
        $${currencyformat(product.priceCents)}
      </div>
  
      <button class="add-to-cart-button button-primary js-add-cart" 
      data-product-id = "${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  });
  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll(".js-add-cart").forEach((button) => {
    button.addEventListener('click' ,() => {
        const productId = button.dataset.productId;

        addToCart(productId);
    })
  })
  