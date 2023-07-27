import React from "react";

const ProductInfoTabs = ()=>{
    return (
        <ul className="tabs wc-tabs" role="tablist">
										<li className="description_tab" id="tab-title-description" role="tab" aria-controls="tab-description"> <a href="#tab-description">Description</a></li>
										<li className="additional_information_tab" id="tab-title-additional_information" role="tab" aria-controls="tab-additional_information"> <a href="#tab-additional_information">Additional information</a></li>
									</ul>
    )
}

export default ProductInfoTabs;