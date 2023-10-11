import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import useSendRequest from "../../hooks/useSendRequest";
import { useDispatch } from "react-redux";
import { setToaster } from "../../app/stateSlice/toasterAlertStateSlice";
import { updateCart } from "../../app/stateSlice/cartStateSlice";
import Alert from "../../components/ui/Form/Alert";
import Button from "../../components/ui/Genral/Button";

const productDetailsLoader = async ({ params: { id } }) => {
  const response = await axios.get(`/api/product/${id}`);
  return response.data;
};

const ProductDetails = () => {
  const product = useLoaderData();
  const [quantity, setQuentity] = useState(1);
  const [request, isLoading, response, error] = useSendRequest();
  const dispatch = useDispatch();

  const addToCardClickHandler = () => {
    // take the quentity and add the item to the cart

    if (+quantity === 0) {
      dispatch(
        setToaster({
          type: "danger",
          title: "Kindly Select quantity",
          body: "quntity is zero no product added",
        })
      );
    }

    const addTocartForm = new FormData();
    addTocartForm.append("quantity", quantity);
    addTocartForm.append("product_id", product.id);
    addTocartForm.append("_method", "put");

    request({
      url: "/api/cart",
      method: "post",
      data: addTocartForm,
    });
  };

  useEffect(() => {
    if (response) {
      dispatch(updateCart(response.data));
      dispatch(
        setToaster({
          type: "success",
          title: "Product Added To Cart",
          body: "Go to cart to have a look at cart",
        })
      );
    }
  }, [response]);

  return (
    <div className="container">
      <div className="card product-details-card mb-3">
        <span className="badge bg-warning text-dark position-absolute product-badge">
          Sale -10%
        </span>
        <div className="card-body">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
          >
            {product.images.map((image) => {
              return (
                <SwiperSlide key={image.id}>
                  <img
                    src={`${
                      import.meta.env.VITE_REACT_APP_API_BASE_URL
                    }/images/ProductImages/${image.path}`}
                    alt=""
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

      <Alert error={error} />

      <div className="card product-details-card mb-3 direction-rtl">
        <div className="card-body">
          <h3>{product.title}</h3>
          <h1>${product.price}</h1>
          <p>{product.heading}</p>
          {/* <select
              className="form-select mb-3"
              id="chooseSize"
              name="chooseSize"
              aria-label="Default select example"
            >
              <option value="1" selected>
                Choose Size
              </option>
              <option value="2">Small</option>
              <option value="3">Medium</option>
              <option value="3">Large</option>
            </select> */}
          <div className="input-group">
            <input
              className="input-group-text form-control"
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuentity(e.target.value);
              }}
            />

            <Button
              isLoading={isLoading}
              btnType="primary"
              type="button"
              btnClass="w-50"
              onClick={addToCardClickHandler}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="card product-details-card mb-3 direction-rtl">
        <div className="card-body">
          <h5>Description</h5>
          <p>{product.description}</p>

          <div className="rating-card-two mt-4">
            {/* <!-- Rating result --> */}
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
              <div className="rating">
                <a href="#">
                  <i className="bi bi-star-fill"></i>
                </a>
                <a href="#">
                  <i className="bi bi-star-fill"></i>
                </a>
                <a href="#">
                  <i className="bi bi-star-fill"></i>
                </a>
                <a href="#">
                  <i className="bi bi-star-fill"></i>
                </a>
                <a href="#">
                  <i className="bi bi-star-half"></i>
                </a>
              </div>
              <span>4.44 out of 5 ratings</span>
            </div>

            {/* <!-- Rating Details --> */}
            <div className="rating-detail">
              {/* <!-- Single Rating Details --> */}
              <div className="d-flex align-items-center mt-2">
                <span>5 star</span>
                <div className="progress-bar-wrapper">
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: "75%" }}
                      role="progressbar"
                      aria-valuenow="78"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span>78%</span>
              </div>

              {/* <!-- Single Rating Details --> */}
              <div className="d-flex align-items-center mt-2">
                <span>4 star</span>
                <div className="progress-bar-wrapper">
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: "14%" }}
                      role="progressbar"
                      aria-valuenow="14"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span>14%</span>
              </div>

              {/* <!-- Single Rating Details --> */}
              <div className="d-flex align-items-center mt-2">
                <span>3 star</span>
                <div className="progress-bar-wrapper">
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: "8%" }}
                      role="progressbar"
                      aria-valuenow="8"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span>8%</span>
              </div>

              {/* <!-- Single Rating Details --> */}
              <div className="d-flex align-items-center mt-2">
                <span>2 star</span>
                <div className="progress-bar-wrapper">
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: "0%" }}
                      role="progressbar"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span>0%</span>
              </div>

              {/* <!-- Single Rating Details --> */}
              <div className="d-flex align-items-center mt-2">
                <span>1 star</span>
                <div className="progress-bar-wrapper">
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      style={{ width: 0 }}
                      role="progressbar"
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <span>0%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card related-product-card direction-rtl">
        <div className="card-body">
          <h5 className="mb-3">Related Products</h5>

          <div className="row g-3">
            {/* <!-- Single Top Product Card --> */}
            <div className="col-6 col-sm-4 col-lg-3">
              <div className="card single-product-card border">
                <div className="card-body p-3">
                  {/* <!-- Product Thumbnail --> */}
                  <a
                    className="product-thumbnail d-block"
                    href="shop-details.html"
                  >
                    <img src="img/bg-img/p1.jpg" alt="" />
                    {/* <!-- Badge --> */}
                    <span className="badge bg-primary">Sale</span>
                  </a>
                  {/* <!-- Product Title --> */}
                  <a
                    className="product-title d-block text-truncate"
                    href="shop-details.html"
                  >
                    Wooden Tool
                  </a>
                  {/* <!-- Product Price --> */}
                  <p className="sale-price">
                    $9.89<span>$13.42</span>
                  </p>
                  <a className="btn btn-danger btn-sm" href="#">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>

            {/* <!-- Single Top Product Card --> */}
            <div className="col-6 col-sm-4 col-lg-3">
              <div className="card single-product-card border">
                <div className="card-body p-3">
                  {/* <!-- Product Thumbnail --> */}
                  <a
                    className="product-thumbnail d-block"
                    href="shop-details.html"
                  >
                    <img src="img/bg-img/p2.jpg" alt="" />
                    {/* <!-- Badge --> */}
                    <span className="badge bg-primary">Sale</span>
                  </a>
                  {/* <!-- Product Title --> */}
                  <a
                    className="product-title d-block text-truncate"
                    href="shop-details.html"
                  >
                    Atoms Musk
                  </a>
                  {/* <!-- Product Price --> */}
                  <p className="sale-price">
                    $3.36<span>$5.99</span>
                  </p>
                  <a className="btn btn-danger btn-sm" href="#">
                    Add to Cart
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { productDetailsLoader };

export default ProductDetails;
