import axios from "axios";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import PorductCard from "./PorductCard";
import SortPagination from "../../components/ui/Pagination/SortPagination";
import Pagination from "../../components/ui/Pagination/pagination";

const ProductListLoader = async ({ request }) => {
  const queryParams = request.url.split("?")[1];
  const response = await axios.get(`/api/products?${queryParams}`);
  return response.data;
};

const ProductsList = () => {
  const listData = useLoaderData();

  const [products, setProducts] = useState(listData.products || listData);

  return (
    <>
      {/* // <!-- Pagination --> */}
      <SortPagination />
      {/* // <!-- Top Products --> */}
      <div className="top-products-area">
        <div className="container">
          <div className="row g-3">
            {/* <!-- Single Top Product Card --> */}
            {products.map((product) => {
              return <PorductCard key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
      <Pagination />
    </>
  );
};

export { ProductListLoader };

export default ProductsList;
