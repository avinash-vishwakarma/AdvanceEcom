import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

const CategorysList = () => {
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    axios
      .get("/api/cateogrys")
      .then((response) => {
        setCategorys(response.data);
      })
      .catch((err) => {
        console.log("error");
      });
  }, []);

  return (
    <Swiper>
      {categorys.map((category) => (
        <SwiperSlide key={category.id}>{category.name}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorysList;
