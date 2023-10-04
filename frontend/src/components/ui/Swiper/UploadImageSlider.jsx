import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./uploadImageSlider.module.css";
import "swiper/css";
import FileUploadCard from "../Card/FileUploadCard";
import RoundButton from "../Genral/RoundButton";

const UploadImageSlider = ({ images, setImages }) => {
  const removeImageHandler = (imageKey) => {
    setImages((old) => {
      return old.filter((image) => {
        return image.clientKey !== imageKey;
      });
    });
  };

  return (
    <Swiper
      className={styles.SlideContainer}
      slidesPerView={1.3}
      spaceBetween={2}
    >
      {images.map((image) => {
        return (
          <SwiperSlide className={styles.SingleSlide} key={image.clientKey}>
            <RoundButton
              onClick={removeImageHandler.bind(null, image.clientKey)}
              btnType="danger"
              className={styles.absoluteBtn}
            >
              <i className="bi bi-trash3" />
            </RoundButton>
            <img src={URL.createObjectURL(image)} />
          </SwiperSlide>
        );
      })}
      <SwiperSlide className={styles.SingleSlide}>
        <FileUploadCard setImages={setImages} />
      </SwiperSlide>
    </Swiper>
  );
};

export default UploadImageSlider;
