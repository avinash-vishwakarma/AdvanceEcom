import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const AdminProductsList = () => {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  const cardClickHandler = (productId) => {
    navigate(`/admin/product/${productId}`);
  };

  return (
    <div className="container">
      <div className="element-heading">
        <h6>Showing Products for : {loaderData.name}</h6>
      </div>

      {loaderData.products.map((product) => {
        return (
          <div
            className="card"
            onClick={cardClickHandler.bind(null, product.id)}
          >
            <div className="card-body">
              <p>
                <strong>Title : </strong>
                {product.title}
              </p>
              <p>
                <strong>Price : ₹ {product.price}</strong>
              </p>
              <p>
                <strong>Heading : </strong>
                {product.heading}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminProductsList;
