import React from "react";

const ProductReviewForm = ()=>{
    return (
        <form action="#" method="post" id="commentform" className="comment-form" novalidate="">
																	<p className="comment-notes">
																		<span id="email-notes">Your email address will not be published.</span> Required fields are marked <span className="required">*
																		</span>
																	</p>
																	<div className="comment-form-rating">
																		<label>Your rating</label>
																		<p className="stars">
																			<span>
																			<a className="star-1" href="#">
																				<span className="svg-icon icon-star">
																					<svg width="12px" height="12px" viewBox="0 0 12 12">
																						<g>
																							<rect fill="none" width="12" height="12"/>
																							<polygon points="6,1 7.18,4.82 11,5 7.91,7.18 9.09,11 6,8.639 2.91,11 4.09,7.18 1,5 4.82,4.82"/>
																						</g>
																					</svg>
																				</span>1
																			</a>
																			<a className="star-2" href="#">
																				<span className="svg-icon icon-star">
																					<svg width="12px" height="12px" viewBox="0 0 12 12">
																						<g>
																							<rect fill="none" width="12" height="12"/>
																							<polygon points="6,1 7.18,4.82 11,5 7.91,7.18 9.09,11 6,8.639 2.91,11 4.09,7.18 1,5 4.82,4.82"/>
																						</g>
																					</svg>
																				</span>2
																			</a>
																			<a className="star-3" href="#">
																				<span className="svg-icon icon-star">
																					<svg width="12px" height="12px" viewBox="0 0 12 12">
																						<g>
																							<rect fill="none" width="12" height="12"/>
																							<polygon points="6,1 7.18,4.82 11,5 7.91,7.18 9.09,11 6,8.639 2.91,11 4.09,7.18 1,5 4.82,4.82"/>
																						</g>
																					</svg>
																				</span>3
																			</a>
																			<a className="star-4" href="#">
																				<span className="svg-icon icon-star">
																					<svg width="12px" height="12px" viewBox="0 0 12 12">
																						<g>
																							<rect fill="none" width="12" height="12"/>
																							<polygon points="6,1 7.18,4.82 11,5 7.91,7.18 9.09,11 6,8.639 2.91,11 4.09,7.18 1,5 4.82,4.82"/>
																						</g>
																					</svg>
																				</span>4
																			</a>
																			<a className="star-5" href="#">
																				<span className="svg-icon icon-star">
																					<svg width="12px" height="12px" viewBox="0 0 12 12">
																						<g>
																							<rect fill="none" width="12" height="12"/>
																							<polygon points="6,1 7.18,4.82 11,5 7.91,7.18 9.09,11 6,8.639 2.91,11 4.09,7.18 1,5 4.82,4.82"/>
																						</g>
																					</svg>
																				</span>5
																			</a>
																		</span>
																	</p>
																	</div>
																	<p className="comment-form-comment">
																		<label for="comment">Your review&nbsp;
																			<span className="required">*</span>
																		</label>
																		<textarea id="comment" name="comment" cols="45" rows="8" required=""></textarea>
																	</p>
																	<p className="comment-form-author">
																		<label for="author">Name&nbsp;
																			<span className="required">*</span>
																		</label>
																		<input id="author" name="author" type="text" value="" size="30" required=""/>
																	</p>
																	<p className="comment-form-email">
																		<label for="email">Email&nbsp;
																			<span className="required">*</span>
																		</label>
																		<input id="email" name="email" type="email" value="" size="30" required=""/>
																	</p>
																	<p className="form-submit focused">
																		<input name="submit" type="submit" id="submit" className="submit" value="Submit"/>
																	</p>
																</form>
    )
}

export default ProductReviewForm;