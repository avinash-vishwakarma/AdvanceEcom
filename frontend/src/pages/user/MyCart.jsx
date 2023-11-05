import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Genral/Button";
import { useDispatch, useSelector } from "react-redux";
import { setToaster } from "../../app/stateSlice/toasterAlertStateSlice";

const myCartLoader = async () => {
  const response = await axios("/api/cart");
  return response.data;
};

const CartItem = ({ product, setCartData }) => {
  const [productQuentity, setProductQuentity] = useState(product.quantity);
  const navigate = useNavigate();

  const quantityChangeHandler = (e) => {
    const quantityValue = e.target.value;

    if (+quantityValue) {
      // send the request to server to update the
      const quantityFormData = new FormData();
      quantityFormData.append("_method", "patch");
      quantityFormData.append("quantity", quantityValue);

      axios
        .post(`api/cart/${product.id}`, quantityFormData)
        .then((response) => {
          setCartData(response.data);
        });
    }
    setProductQuentity(quantityValue);
  };

  const removeProductHandler = () => {
    axios.delete(`api/cart/${product.id}`).then((response) => {
      setCartData(response.data);
    });
  };

  return (
    <tr>
      <th scope="row">
        <img
          src={`${
            import.meta.env.VITE_REACT_APP_API_BASE_URL
          }/images/ProductImages/${product.product.images[0].path}`}
          alt=""
        />
      </th>
      <td>
        <h6 className="mb-1">{product.product.title}</h6>
        <span>${product.product.price}</span>
      </td>
      <td>
        <div className="quantity">
          <input
            className="qty-text"
            type="text"
            onChange={quantityChangeHandler}
            value={productQuentity}
          />
        </div>
      </td>

      <td>
        <h6>{product.total}</h6>
      </td>
      <td>
        <span className="remove-product" onClick={removeProductHandler}>
          <i className="bi bi-x-lg"></i>
        </span>
      </td>
    </tr>
  );
};

const MyCart = () => {
  const [{ cart, total }, setCartData] = useState(useLoaderData());
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentConfirmationHandler = (response) => {
    console.log(response);
    axios.postForm("/api/confrim-payment", response).then((confResponse) => {
      dispatch(
        setToaster({
          type: "success",
          title: "payment successfull",
          body: "You can track you order in My Orders section",
        })
      );
      navigate("/my-orders", {
        replace: true,
      });
    });
  };

  const placeOrderHanlder = () => {
    axios.post("/api/place-order").then(({ data }) => {
      console.log(data);
      const options = {
        key: import.meta.env.VITE_REACT_APP_RAZORPAY_PUBLIC_KEY,
        currency: data.currency,
        amount: +data.amount,
        name: "Learning To Code Online",
        description: "Test Wallet Transaction",
        order_id: data.id,
        handler: paymentConfirmationHandler,
        prefill: {
          name: auth.user.name,
          email: auth.user.email,
          number: "7000789511",
        },
      };

      const paymentObeject = new window.Razorpay(options);
      paymentObeject.open();
    });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  return (
    <div className="container">
      {/* <!-- Cart Wrapper --> */}
      <div className="cart-wrapper-area">
        <div className="cart-table card mb-3">
          <div className="table-responsive card-body">
            <table className="table mb-0 text-center">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <CartItem
                    key={product.id}
                    setCartData={setCartData}
                    product={product}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="card-body border-top">
            <Button
              type="button"
              btnType="danger"
              onClick={placeOrderHanlder}
              btnclassName="w-100"
            >
              Pay ${total}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { myCartLoader };
export default MyCart;
