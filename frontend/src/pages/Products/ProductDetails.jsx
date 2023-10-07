import axios from "axios";
import React from "react";

const productDetailsLoader = async ({ params: { id } }) => {
  const response = await axios.get(`/product/${id}`);
  return response.data;
};

const ProductDetails = () => {
  return <div>ProductDetails</div>;
};

export { productDetailsLoader };

export default ProductDetails;
