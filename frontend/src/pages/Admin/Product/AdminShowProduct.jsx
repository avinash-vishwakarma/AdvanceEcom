import React, { useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Genral/Button";
import useSendRequest from "../../../hooks/useSendRequest";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../app/stateSlice/toasterAlertStateSlice";
import Alert from "../../../components/ui/Form/Alert";
import { Swiper, SwiperSlide } from "swiper/react";
import BadgeList from "../../../components/ui/Lists/BadgeList";

const AdminShowProduct = () => {
  const product = useLoaderData();
  const [request, isLoading, response, error] = useSendRequest();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDeleteHandler = () => {
    request({
      url: `api/admin/product/${product.id}`,
      method: "delete",
    });
  };

  useEffect(() => {
    if (response) {
      dispatch(
        setToaster({
          type: "success",
          title: "Product Deleted",
          body: "product deleted successfully",
        })
      );
      navigate("/admin/dashboard", {
        replace: true,
      });
    }
  }, [response]);

  return (
    <div className="container">
      <Alert error={error} />

      <Swiper>
        {product.images.map((image) => (
          <SwiperSlide key={image.id}>
            <img
              src={`${
                import.meta.env.VITE_REACT_APP_API_BASE_URL
              }/images/ProductImages/${image.path}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="card product-details-card mb-3 direction-rtl">
        <div className="card-body">
          <h3>{product.title}</h3>
          <h1>₹ {product.price}</h1>
          <p>{product.heading}</p>
          <Link
            to={`/admin/product/edit/${product.id}`}
            className="btn mb-2 btn-success w-100"
          >
            <i className="bi bi-pencil-square px-2" />
            Edit Product
          </Link>
          <Button
            isLoading={isLoading}
            onClick={productDeleteHandler}
            type="button"
            btnType="danger"
          >
            <i className="bi bi-trash3 px-2" />
            Delete Product
          </Button>
        </div>
      </div>

      <div className="card product-details-card mb-3 direction-rtl">
        <div className="card-body">
          <div className="mb-4">
            <h5>Categorys</h5>
            <div>
              {product.categorys.map((cateory) => (
                <span className="m-1 badge bg-primary" key={cateory.id}>
                  {cateory.name}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5>Description</h5>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShowProduct;
