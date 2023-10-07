import React from "react";
import { Link } from "react-router-dom";

const PorductCard = ({ id, images, title, price }) => {
  return (
    <div className="col-6 col-sm-4 col-lg-3">
      <div className="card single-product-card">
        <Link to={`/product/${id}`}>
          <div className="card-body p-3">
            {/* <!-- Product Thumbnail --> */}
            <div className="product-thumbnail d-block" href="shop-details.html">
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_API_BASE_URL
                }/images/ProductImages/${images[0].path}`}
                alt=""
              />
              {/* <!-- Badge --> */}
              {/* <span className="badge bg-warning">Sale</span> */}
            </div>
            {/* <!-- Product Title --> */}
            <div className="product-title d-block text-truncate">{title}</div>
            {/* <!-- Product Price --> */}
            <p className="sale-price">$ {price}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PorductCard;
