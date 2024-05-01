const cart = {
    cartItem : undefined,

    saveFromCart(){
        this.cartItem = JSON.parse(localStorage.getItem("cartsss"))

        if(!this.cartItem){
            this.cartItem = [
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
    },

    addToCart(productId){
        let matchingitem;
        this.cartItem.forEach((item) => {
            if(item.productId === productId){
                matchingitem = item
            }
        })
        console.log('Matching Item:', matchingitem)
        if(matchingitem){
            matchingitem.quantity += 1;
             
        }
        else{
            this.cartItem.push({
                productId : productId,
                quantity : 1,
                deliveryOptionId : '1',
            });
            
        }
        let cartQuantity = 0;
        this.cartItem.forEach((items) => {
            cartQuantity += items.quantity;
        })
        document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
        this.savetostorage();
      },

      deletecart(productId){
        let newCart = [];
    
        this.cartItem.forEach((items) => {
            if(items.productId !== productId){
                newCart.push(items);
            }
        })
    
        this.cartItem = newCart;
        this.savetostorage();
    },

    getProduct(productId){
        let matchingitem;
        this.cartItem.forEach((item) => {
          if(item.productId === productId){
              matchingitem = item
          }
      })
      return matchingitem;
    },

    savetostorage(){
        localStorage.setItem('cartsss' ,JSON.stringify(this.cartItem));
    }
}

saveFromCart();