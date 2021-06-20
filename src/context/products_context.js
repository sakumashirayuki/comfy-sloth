import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
    SIDEBAR_OPEN,
    SIDEBAR_CLOSE,
    GET_PRODUCTS_BEGIN,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_ERROR,
    GET_SINGLE_PRODUCT_BEGIN,
    GET_SINGLE_PRODUCT_SUCCESS,
    GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
    isSidebarOpen: false,
    productsLoading: false,
    productsError: false,
    products: [],
    featuredProducts: [],
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const openSidebar = () => {
        dispatch({ type: SIDEBAR_OPEN });
    };

    const closeSiderbar = () => {
        dispatch({ type: SIDEBAR_CLOSE });
    };

    const fetchProducts = async (url) => {
        dispatch({ type: GET_PRODUCTS_BEGIN });
        try {
            const response = await axios.get(url); // data
            const products = response.data;
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: products,
            });
        } catch (error) {
            dispatch({ type: GET_PRODUCTS_ERROR });
        }
    };

    useEffect(() => {
        fetchProducts(url);
    }, []);

    return (
        <ProductsContext.Provider
            value={{ ...state, openSidebar, closeSiderbar }}
        >
            {children}
        </ProductsContext.Provider>
    );
};
// make sure use
export const useProductsContext = () => {
    return useContext(ProductsContext);
};
