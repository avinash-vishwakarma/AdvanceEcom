import React, { useEffect } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Genral/Button";
import useSendRequest from "../../../hooks/useSendRequest";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../app/stateSlice/toasterAlertStateSlice";
import Alert from "../../../components/ui/Form/Alert";

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
          <h5>Description</h5>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminShowProduct;
