import React from "react";
import { useLoaderData } from "react-router-dom";
// Conponents
import Banners from "../components/ui/Swiper/Banners";
import CategorysList from "../components/Functional/CategorysList";
import SearchBox from "../components/Functional/SearchBox";

const Home = () => {
  const banners = useLoaderData();

  return (
    <>
      <div className="container">
        <SearchBox />
        <Banners images={banners} />
        <div className="element-heading">
          <h6>Find From Categorys</h6>
        </div>
        <CategorysList />

        <div className="element-heading">
          <h6>Best Selling Products</h6>
        </div>
      </div>
    </>
  );
};

export default Home;
