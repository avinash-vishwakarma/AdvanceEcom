import React from "react";
import { useLoaderData } from "react-router-dom";
// Conponents
import Banners from "../components/ui/Swiper/Banners";
import CategorysList from "../components/Functional/CategorysList";

const Home = () => {
  const banners = useLoaderData();

  return (
    <>
      <Banners images={banners} />
      <div className="container">
        <div class="element-heading">
          <h6>Find From Categorys</h6>
        </div>
        <CategorysList />
      </div>
    </>
  );
};

export default Home;
