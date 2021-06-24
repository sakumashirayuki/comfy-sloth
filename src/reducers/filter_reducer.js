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
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        allProducts: [...action.payload],
        filteredProduct: [...action.payload],
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
      let tempProducts = [...filteredProduct];
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
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
