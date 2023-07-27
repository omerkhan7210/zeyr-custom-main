import React from "react";

const AddtoWishlistButton = ()=>{
    return (
        <a href="#" className="button add-to-wishlist-button" rel="nofollow">
									<span className="add-to-wishlist add">
										<span className="svg-icon icon-heart-o size-normal ">
											<svg width="24px" height="24px" viewBox="0 0 24 24">
												<g>
													<path d="M16.243,5.843c0.801,0,1.555,0.312,2.121,0.879c1.17,1.17,1.17,3.073,0,4.243l-2.121,2.121l-2.121,2.121L12,17.328 l-2.121-2.121l-2.121-2.121l-2.121-2.121c-0.567-0.567-0.879-1.32-0.879-2.121c0-0.801,0.312-1.555,0.879-2.121 c0.567-0.567,1.32-0.879,2.121-0.879c0.801,0,1.555,0.312,2.121,0.879l0.707,0.707L12,8.843l1.414-1.414l0.707-0.707 C14.688,6.155,15.441,5.843,16.243,5.843 M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707 c-0.976-0.976-2.256-1.464-3.536-1.464S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121 L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843 L16.243,3.843z"/>
													<rect fill="none" width="24" height="24"/>
												</g>
											</svg>
										</span>
										<span className="screen-reader-text button-text">Add to wishlist</span>
									</span>
									<span className="adding-to-wishlist adding">
										<span className="spinner"></span>
										<span className="screen-reader-text button-text">Adding to wishlist</span>
									</span>
									<span className="brow-wishlist added">
										<span className="svg-icon icon-heart size-normal ">
											<svg width="24px" height="24px" viewBox="0 0 24 24">
												<g>
													<path d="M16.243,3.843c-1.28,0-2.559,0.488-3.536,1.464L12,6.015l-0.707-0.707c-0.976-0.976-2.256-1.464-3.536-1.464 S5.198,4.331,4.222,5.308c-1.953,1.953-1.953,5.118,0,7.071L6.343,14.5l2.121,2.121L12,20.157l3.536-3.536l2.121-2.121l2.121-2.121 c1.953-1.953,1.953-5.118,0-7.071C18.802,4.331,17.522,3.843,16.243,3.843L16.243,3.843z"/>
													<rect fill="none" width="24" height="24"/>
												</g>
											</svg>
										</span>
										<span className="screen-reader-text button-text">Added to wishlist</span>
									</span>
								</a>

    )
}

export default AddtoWishlistButton;