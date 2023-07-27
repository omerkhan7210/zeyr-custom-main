import React from "react";

const ProductOrdering = ()=>{
    return (
        <form className="products-ordering" method="get">
        <select name="orderby" className="konte-select2--small" aria-label="Shop order" tabIndex="-1" aria-hidden="true">
            <option defaultValue="menu_order" value={"selected"}>Sort by</option>
            <option defaultValue="popularity">Sort by popularity</option>
            <option defaultValue="rating">Sort by average rating</option>
            <option defaultValue="date">Sort by latest</option>
            <option defaultValue="price">Sort by price: low to high</option>
        </select>
    </form>
    )
}

export default ProductOrdering;