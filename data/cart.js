 export let cart = JSON.parse(localStorage.getItem("cartss"))

 if(!cart){
    cart = [
        {
            productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity  : 0,
            deliveryOptionId : '1',
        },
        {
            productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity  : 0,
            deliveryOptionId : '2',
        }
    ];    
 }
     
 export function addToCart(productId){
    let matchingitem;
    cart.forEach((item) => {
        if(item.productId === productId){
            matchingitem = item
        }
    })
    console.log('Matching Item:', matchingitem)
    if(matchingitem){
        matchingitem.quantity += 1;
         
    }
    else{
        cart.push({
            productId : productId,
            quantity : 1,
            deliveryOptionId : '1',
        });
        
    }
    let cartQuantity = 0;
    cart.forEach((items) => {
        cartQuantity += items.quantity;
    })
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    savetostorage();
  }
  
export function deletecart(productId){
    let newCart = [];

    cart.forEach((items) => {
        if(items.productId !== productId){
            newCart.push(items);
        }
    })

    cart = newCart;
    savetostorage();
}
    export function getProduct(productId){
        let matchingitem;
        cart.forEach((item) => {
          if(item.productId === productId){
              matchingitem = item
          }
      })
      return matchingitem;
  }

function  savetostorage(){
    localStorage.setItem('cartss' ,JSON.stringify(cart));
}