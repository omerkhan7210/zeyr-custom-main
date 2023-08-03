import React,{useContext, useState} from "react";
import SearchItem from "./SearchItem"

const SearchModal = ({products,hostlink})=>{


	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState([]);
  
	const handleSearch = (e) => {
	  const query = e.target.value;
	  setSearchTerm(query);
  
	  const filteredProducts = products.filter((product) =>
		product.name.toLowerCase().includes(query.toLowerCase())
	  );
	  setSearchResults(filteredProducts);
	};
  

    return (
	<div id="search-modal" className="search-modal modal">
		<div className="modal-header">
			<div className="hamburger-menu button-close active">
				<span className="menu-text">Close</span>
				<div className="hamburger-box">
					<div className="hamburger-inner"></div>
				</div>
			</div>
		</div>
		<div className="modal-content">
			<div className="search-form konte-container">
				<form  className="instance-search">
					<div className="search-fields">
						<input type="text" name="s" className="search-field" placeholder="Find Your Luxury" autoComplete="off" value={searchTerm}
                		onChange={handleSearch}/>

						<span className="spinner"></span>
						<button type="reset" className="search-reset">
							<svg width="24px" height="24px" viewBox="0 0 24 24">
								<g>
									<rect fill="none" width="24" height="24"/>
									<polygon points="19.778,5.636 18.364,4.222 12,10.586 5.636,4.222 4.222,5.636 10.586,12 4.222,18.364 5.636,19.778 12,13.414 18.364,19.778 19.778,18.364 13.414,12 	"/>
								</g>
							</svg>
						</button>
					</div>
				</form>
			</div>
			<div className="search-result konte-container" style={searchResults && searchResults.length > 0 ? {opacity : '1'} : null}> 
				<p className="label">Search Result</p>
				<div  className="cart-panel">
		
					<div className="panel">
						<div className="panel-content">
						<div className="widget_shopping_cart_content products">
						{searchResults && searchResults.length > 0 ? (
								<ul className="mini-cart cart_list product_list_widget d-flex align-center g2">
								{searchResults.map((item) => (
									<SearchItem key={item.id} item={item}  hostlink={hostlink}  />
								))}
								</ul>
							) : (
								<p>No results found.</p>
							)}
						</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
    )
}

export default SearchModal;