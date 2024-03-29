import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import PorductCard from "./PorductCard";
import SortPagination from "../../components/ui/Pagination/SortPagination";
import Pagination from "../../components/ui/Pagination/pagination";

const ProductListLoader = async ({ request }) => {
  const queryParams = request.url.split("?")[1];
  const response = await axios.get(`/api/products?${queryParams}`);
  // console.log(response.data);
  return response.data;
};

const ProductsList = () => {
  const listData = useLoaderData();
  const [products, setProducts] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const SortChangeHandler = (e) => {
    const queries = new URLSearchParams(location.search);
    queries.set("sort", e.target.value);
    navigate(`?${queries.toString()}`);
  };

  useEffect(() => {
    setProducts(listData.products || listData);
  }, [listData]);

  return (
    <>
      {/* // <!-- Pagination --> */}
      <SortPagination
        currentPage={products?.current_page}
        lastPage={products?.last_page}
        sortChangeHandler={SortChangeHandler}
      />
      {/* // <!-- Top Products --> */}
      <div className="top-products-area">
        <div className="container">
          <div className="row g-3">
            {/* <!-- Single Top Product Card --> */}
            {products?.data.map((product) => {
              return <PorductCard key={product.id} {...product} />;
            })}
          </div>
        </div>
      </div>
      <Pagination links={products?.links} />
    </>
  );
};

export { ProductListLoader };

export default ProductsList;
