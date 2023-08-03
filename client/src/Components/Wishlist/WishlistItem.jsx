import React, { useContext } from "react";
import { WishlistContextC } from "../Context/WishlistContext";

const WishlistItem = ({hostLink}) => {
  const { wishlist, removeFromWishlist } = useContext(WishlistContextC)

  return (
    <>
      {wishlist.length > 0 ? (
        <table className="shop_table shop_table_responsive wishlist_table">
		<thead>
			<tr>
				<th className="product-thumbnail">Product</th>
				<th className="product-name">&nbsp;</th>
				<th className="product-price">Price</th>
				<th className="product-stock-status">Stock status</th>
				<th className="product-remove">&nbsp;</th>
			</tr>
		</thead>
          <tbody>
            {wishlist.map((w) => (
              <tr className="product-item" key={w.id}>
                <td className="product-thumbnail">
                  <a href="#">
                    <img
                      width="150"
                      height="150"
                      src={`${hostLink}/uploads/` + w.featuredImage}
                      className=""
                      alt={w.name}
                    />
                  </a>
                </td>

                <td className="product-name" data-title="Product">
                  <a href="#">{w.name}</a>
                </td>

                <td className="product-price" data-title="Price">
                  <span className="amount">
                    <span className="currencySymbol">$</span>
                    {w.price}
                  </span>
                </td>

                <td className="product-stock-status">In stock</td>

               

                <td className="product-remove">
                  <a
                    className="remove"
                    aria-label="Remove this item"
                    onClick={() => removeFromWishlist(w.id)}
                  >
                    <span className="svg-icon icon-close size-normal close-icon">
                      <svg width="24px" height="24px" viewBox="0 0 24 24">
                        <g>
                          <rect fill="none" width="24" height="24" />
                          <polygon points="19.778,5.636 18.364,4.222 12,10.586 5.636,4.222 4.222,5.636 10.586,12 4.222,18.364 5.636,19.778 12,13.414 18.364,19.778 19.778,18.364 13.414,12" />
                        </g>
                      </svg>
                    </span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No items in wishlist</p>
      )}
    </>
  );
};

export default WishlistItem;
