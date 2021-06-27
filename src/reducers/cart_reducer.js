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
            return state;

        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
};

export default cart_reducer;
