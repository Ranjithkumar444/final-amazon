import { getDelevierycharge } from "../data/deliveryOption.js";
import { cart } from "../data/cart.js";
import { products } from "../data/products.js";

export function orderSummary() {
    let totalProductPrice = 0;
    let totalDeliveryCharge = 0;
  
    // Calculate total product price and delivery charge for each item in the cart
    cart.forEach((item) => {
        const product = products.find((p) => p.id === item.productId);
        const productPrice = product.priceCents * item.quantity;
        totalProductPrice += productPrice;

        // Get the selected delivery option for the current item
        const selectedDeliveryOption = getDelevierycharge(item.deliveryOptionId);
        totalDeliveryCharge += selectedDeliveryOption.priceCents; // Add the delivery charge to the total
    });
  
    let Totalproductrate = totalProductPrice/100;
    let Totaldeliveryrate= totalDeliveryCharge/100;

    let Totalbeforetax = Totaldeliveryrate + Totalproductrate;
    let Totaltaxcents  = Totalbeforetax * 0.1;
    let FinalTotal = Totaltaxcents + Totalbeforetax;
    
    console.log(FinalTotal);

    const PaymentSummaryHTML = `
    <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money">$${Totalproductrate}</div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">$${Totaldeliveryrate}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">$${Totalbeforetax}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">$${Totaltaxcents}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">$${FinalTotal}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
    `

    document.querySelector(".js-payment-summary").innerHTML = PaymentSummaryHTML;
  }
  