import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./cateogryList.module.css";
import { Link } from "react-router-dom";

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
    <Swiper
      className={`${styles.listContainer} mb-4`}
      slidesPerView={4.5}
      spaceBetween={15}
    >
      {categorys.map((category) => (
        <SwiperSlide key={category.id} className={styles.box}>
          <Link
            className={styles.linkBox}
            to={`/products?category=${category.id}`}
          >
            <i className={category.icon}></i>
            <p>{category.name}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CategorysList;
