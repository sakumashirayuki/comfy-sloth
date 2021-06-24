import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
    const { filteredProduct: products, gridView } = useFilterContext();
    if (products.length < 1)
        return (
            <h5 style={{ textTransform: "none" }}>
                Sorry, no products matched your search...
            </h5>
        );
    if (gridView) return <GridView products={products}></GridView>;
    else return <ListView products={products}>product list</ListView>;
};

export default ProductList;
