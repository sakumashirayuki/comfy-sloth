import {
    LOAD_PRODUCTS,
    SET_LISTVIEW,
    SET_GRIDVIEW,
    UPDATE_SORT,
    SORT_PRODUCTS,
    UPDATE_FILTERS,
    FILTER_PRODUCTS,
    CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  let tempProducts;
    switch (action.type) {
        case LOAD_PRODUCTS:
            let maxPrice = Math.max(
                ...action.payload.map((product) => product.price)
            );
            return {
                ...state,
                allProducts: [...action.payload],
                filteredProduct: [...action.payload],
                filters: {
                    ...state.filters,
                    maxPrice: maxPrice,
                    price: maxPrice,
                },
            };
        case SET_GRIDVIEW:
            return {
                ...state,
                gridView: true,
            };
        case SET_LISTVIEW:
            return {
                ...state,
                gridView: false,
            };
        case UPDATE_SORT:
            return {
                ...state,
                sort: action.payload,
            };
        case SORT_PRODUCTS:
            const { sort, filteredProduct } = state;
            tempProducts = [...filteredProduct];
            switch (sort) {
                case "price-lowest":
                    tempProducts.sort((a, b) => a.price - b.price);
                    break;
                case "price-highest":
                    tempProducts.sort((a, b) => b.price - a.price);
                    break;
                case "name-a":
                    tempProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "name-z":
                    tempProducts.sort((a, b) => b.name.localeCompare(a.name));
                    break;
                default:
                    break;
            }
            return { ...state, filteredProduct: tempProducts };
        case UPDATE_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.payload.name]: action.payload.value,
                },
            };
        case FILTER_PRODUCTS:
            const { allProducts } = state;
            const { text, category, company, color, price, shipping } = state.filters;
            tempProducts = [...allProducts];
            if(text)
              tempProducts = tempProducts.filter((product)=>product.name.match(new RegExp(text, 'i')));
            
            
            return { ...state, filteredProduct: tempProducts };
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    text: "",
                    company: "all",
                    category: "all",
                    color: "all",
                    price: state.filters.maxPrice,
                    shipping: false,
                },
            };
        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }
};

export default filter_reducer;
