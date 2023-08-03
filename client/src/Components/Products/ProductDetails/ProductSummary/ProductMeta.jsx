import React,{useContext} from "react";
import { ProductDetailsContext } from "../ProductDetailPage";
import { Link } from "react-router-dom";

const ProductMeta = ()=>{
	const {product} = useContext(ProductDetailsContext)
    return (

        <div className="product_meta">
									<span className="sku_wrapper">
										<span className="label">SKU: </span>
										<span className="sku">{product.sku}</span>
									</span>
									<span className="posted_in">
										<span className="label">Category</span>
										<Link to="/men" rel="tag">{product.categories}</Link>
									</span>
									
								</div>
    )
}
export default ProductMeta;