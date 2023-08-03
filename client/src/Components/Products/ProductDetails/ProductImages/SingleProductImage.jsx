import React, { useContext } from "react";
import { Link } from "react-router-dom";

const SingleProductImage = ({productImg,prodName,hostlink})=>{


    return (
        
										<Link to={`${hostlink}/uploads/` + productImg}>
											<img src={`${hostlink}/uploads/` + productImg} alt={prodName} data-large_image_width="680" data-large_image_height="960"/>
										</Link>
									
    )
}
export default SingleProductImage;