import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./uploadImageSlider.module.css";
import "swiper/css";
import FileUploadCard from "../Card/FileUploadCard";
import RoundButton from "../Genral/RoundButton";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../app/stateSlice/toasterAlertStateSlice";
import axios from "axios";

const UploadImageSlider = ({ images, setImages }) => {
  const dispatch = useDispatch();

  const removeImageHandler = (imageKey) => {
    setImages((old) => {
      return old.filter((image) => {
        return !(image.clientKey == imageKey || image.id == imageKey);
      });
    });
  };

  const deleteImageHandler = (id) => {
    axios.delete(`api/admin/product/${id}?image=true`).then(() => {
      // set the notification to deleted
      dispatch(
        setToaster({
          title: "Image Deleted Successfully",
          body: "Uploaded Image Deleted",
          type: "success",
        })
      );
      // remove the image from the frontend array
      removeImageHandler(id);
    });
  };

  return (
    <Swiper
      className={styles.SlideContainer}
      slidesPerView={1.3}
      spaceBetween={2}
    >
      {images.map((image) => {
        if (image.id) {
          return (
            <SwiperSlide className={styles.SingleSlide} key={image.id}>
              <RoundButton
                onClick={deleteImageHandler.bind(null, image.id)}
                btnType="danger"
                className={styles.absoluteBtn}
              >
                <i className="bi bi-trash3" />
              </RoundButton>
              <img
                src={`${
                  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"
                }/images/ProductImages/${image.path}`}
              />
            </SwiperSlide>
          );
        } else {
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
        }
      })}
      <SwiperSlide className={styles.SingleSlide}>
        <FileUploadCard setImages={setImages} />
      </SwiperSlide>
    </Swiper>
  );
};

export default UploadImageSlider;
