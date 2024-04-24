
export const deliveryOptions = [{
    id : '1',
    deliveryDate : 7,
    priceCents : 0
},
{
    id : '2',
    deliveryDate : 4,
    priceCents : 499,
},{
    id : '3',
    deliveryDate : 1,
    priceCents : 999,
}]

export function getDelevierycharge(deliveryOptionIdss){
    let deliveryOption ;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionIdss) {
        deliveryOption = option;
      }
    });
    return deliveryOption;
}