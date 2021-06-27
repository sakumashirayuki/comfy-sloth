import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const { id, color, amount, product } = action.payload;
            const tempItem = state.cart.find((i) => i.id === id + color); // return the value
            if (tempItem) {
                // already in the cart
                const tempCart = state.cart.map((cartItem) => {
                  if(cartItem.id === id + color){
                    let newAmout = Math.min(cartItem.max, cartItem.amount + amount); // add new amount
                    return {...cartItem, amount: newAmout};
                  }else{
                    return cartItem; // no change
                  }
                });
                return { ...state, cart: tempCart };
            } else {
                // not exist in the cart
                const newItem = {
                    id: id + color,
                    name: product.name,
                    color,
                    amount,
                    image: product.images[0].url,
                    price: product.price,
                    max: product.stock
                };
                return { ...state, cart: [...state.cart, newItem] };
            }
        case REMOVE_CART_ITEM:
          const tempCart = state.cart.filter((item)=>item.id!==action.payload);
          return {...state, cart: tempCart};
        case CLEAR_CART:
          return {...state, cart: []};
        case TOGGLE_CART_ITEM_AMOUNT:
          const { id: id_2, value} = action.payload; // there's no block scope in switch-case statement
          const tempCart_2 = state.cart.map((item) => {
            if(item.id===id_2){
              let newAmount;
              if(value==='inc'){
                newAmount = Math.min(item.amount + 1, item.max);
              }else if(value==='dec'){
                newAmount = Math.max(item.amount - 1, 1);
              }
              return {...item, amount: newAmount}
            }else{
              return item;
            }
          })
          return {...state, cart: tempCart_2};
        case COUNT_CART_TOTALS:
          const {totalItems, totalAmount} = state.cart.reduce((total, cartItem)=>{
            const {price, amount} = cartItem;
            total.totalItems += amount;
            total.totalAmount += amount * price;
            return total;
          }, {totalItems: 0, totalAmount: 0});
          return {...state, totalItems, totalAmount};
        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
};

export default cart_reducer;
