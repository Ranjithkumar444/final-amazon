 export let cart = [{
        productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity  : 0,
     },{
        productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity  : 0,
     }];

     function savetostorage(){
        localStorage.getItem("cart",JSON.stringify(cart));
     }

 export function addToCart(productId){
    let matchingitem;
    cart.forEach((item) => {
        if(item.productId === productId){
            matchingitem = item
        }
    })
    if(matchingitem){
        matchingitem.quantity += 1;
    }
    else{
        cart.push({
            productId : productId,
            quantity : 1
        })
    }
    let cartQuantity = 0;
    cart.forEach((items) => {
        cartQuantity += items.quantity;
    })
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;

  }
  
export function deletecart(productId){
    let newCart = [];

    cart.forEach((items) => {
        if(items.productId !== productId){
            newCart.push(items);
        }
    })

    cart = newCart;
}