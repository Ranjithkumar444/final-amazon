import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDelevierycharge } from '../data/deliveryOption.js';
import { cart, deletecart } from "../data/cart.js";
import { products } from "../data/products.js";
import { currencyformat } from "./utils/currency.js";
import { orderSummary } from '../checkout/orderSummary.js';

function generateCartItemHTML(cartitem) {
    const productItem = cartitem.productId;
    let matchingitems;

    products.forEach((product) => {
        if (product.id === productItem) {
            matchingitems = product;
        }
    });

    let today = dayjs();
    let deliveryOption = getDelevierycharge(cartitem.deliveryOptionId);
    let isCheked = deliveryOption.id === cartitem.deliveryOptionId;
    let deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
    let dateString = deliveryDate.format('dddd, MMMM D');

    return `
        <div class="cart-item-container js-cart-item-container-${matchingitems.id}">
            <div class="delivery-date js-delivery-date-${matchingitems.id}">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image" src="${matchingitems.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingitems.name}
                    </div>
                    <div class="product-price">
                        $${currencyformat(matchingitems.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${matchingitems.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingitems.id}">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingitems, cartitem)}
                </div>
            </div>
        </div>
    `;
}

function deliveryOptionsHTML(matchingitems, cartitem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
        let today = dayjs();
        let isCheked = deliveryOption.id === cartitem.deliveryOptionId;
        let deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
        let dateString = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${currencyformat(deliveryOption.priceCents)} -`;

        html += `
            <div class="delivery-option">
                <input type="radio"
                    ${isCheked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingitems.id}"
                    data-product-id="${matchingitems.id}"
                    data-delivery-option-id="${deliveryOption.id}"
                    value="${deliveryOption.id}">
                <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} - Shipping
                    </div>
                </div>
            </div>
        `;
    });
    return html;
}

document.querySelector(".js-order-summary").innerHTML = cart.map(generateCartItemHTML).join('');

document.querySelectorAll(".js-delete-quantity-link").forEach((cartitems) => {
    cartitems.addEventListener("click", () => {
        const productId = cartitems.dataset.productId;
        deletecart(productId);
        const delpro = document.querySelector(`.js-cart-item-container-${productId}`);
        delpro.remove();
    });
});

// Add event listener to each radio button
document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", (event) => {
        const productId = event.target.dataset.productId;
        const deliveryOptionId = event.target.dataset.deliveryOptionId;

        const cartItem = cart.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.deliveryOptionId = deliveryOptionId;

            // Update delivery date display
            let today = dayjs();
            let deliveryOption = getDelevierycharge(deliveryOptionId);
            let deliveryDate = today.add(deliveryOption.deliveryDate, 'days');
            let dateString = deliveryDate.format('dddd, MMMM D');
            updateDeliveryDate(productId, dateString);

            // Recalculate order summary
            orderSummary();
        }
    });
});

// Function to update delivery date display
function updateDeliveryDate(productId, dateString) {
    const deliveryDateElement = document.querySelector(`.js-delivery-date-${productId}`);
    if (deliveryDateElement) {
        deliveryDateElement.textContent = `Delivery date: ${dateString}`;
    }
}
