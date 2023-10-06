import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../app/stateSlice/toasterAlertStateSlice";
import styles from "../../../components/ui/Swiper/uploadImageSlider.module.css";
import RoundButton from "../../../components/ui/Genral/RoundButton";

const AdminBanners = () => {
  const banners = useLoaderData();
  const [images, setImages] = useState(banners);
  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const inputFile = e.target.files[0];
    axios
      .postForm("/api/admin/banner", {
        image: inputFile,
      })
      .then((response) => {
        setImages(response.data);
        dispatch(
          setToaster({
            title: "Banner Updated",
            body: "Banner Image Uploaded Successfully",
            type: "success",
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBannerHandler = (id) => {
    axios.delete(`api/admin/banner/${id} `).then((response) => {
      setImages((currentImges) => {
        return currentImges.filter((image) => {
          return image.id !== id;
        });
      });
      dispatch(
        setToaster({
          title: "Banner Deleted",
          body: "Banner Image Deleted Successfully",
          type: "success",
        })
      );
    });
  };

  console.log(images);

  return (
    <div className="container">
      <div className="element-heading">
        <h6>Add New Product</h6>
      </div>

      <Swiper className="mb-4">
        {images.map((banner) => (
          <SwiperSlide className={styles.SingleSlide} key={banner.id}>
            <RoundButton
              onClick={deleteBannerHandler.bind(null, banner.id)}
              btnType="danger"
              className={styles.absoluteBtn}
            >
              <i className="bi bi-trash3" />
            </RoundButton>
            <img
              src={`${
                import.meta.env.VITE_REACT_APP_API_BASE_URL
              }/images/Banners/${banner.path}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <label htmlFor="AddBannerInput" className="btn btn-primary w-100">
        <i className="bi bi-cloud-arrow-up"></i>
        Add Banner
      </label>
      <input
        type="file"
        accept="jpg,png,jpeg"
        id="AddBannerInput"
        onChange={inputChangeHandler}
        className="d-none"
      />
    </div>
  );
};

export default AdminBanners;
