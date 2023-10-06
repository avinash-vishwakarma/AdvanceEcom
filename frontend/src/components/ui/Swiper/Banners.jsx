import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const Banners = ({ images }) => {
  return (
    <Swiper
      className="container mb-4"
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Pagination]}
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <img
            src={`${
              import.meta.env.VITE_REACT_APP_API_BASE_URL
            }/images/Banners/${image.path}`}
            alt=""
            className="w-100 rounded"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banners;
