import axios from "axios";
import React from "react";
import { useLoaderData } from "react-router-dom";
import Button from "../../components/ui/Genral/Button";

const myCartLoader = async () => {
  const response = await axios("/api/cart");
  return response.data;
};

const MyCart = () => {
  const cartData = useLoaderData();

  console.log(cartData);

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
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <img src="img/bg-img/p1.jpg" alt="" />
                  </th>
                  <td>
                    <h6 className="mb-1">Wooden Tool</h6>
                    <span>$9.89 × 1</span>
                  </td>
                  <td>
                    <div className="quantity">
                      <input className="qty-text" type="text" value="1" />
                    </div>
                  </td>
                  <td>
                    <a className="remove-product" href="#">
                      <i className="bi bi-x-lg"></i>
                    </a>
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <img src="img/bg-img/p3.jpg" alt="" />
                  </th>
                  <td>
                    <h6 className="mb-1">Black T-shirt</h6>
                    <span>$10.99 × 2</span>
                  </td>
                  <td>
                    <div className="quantity">
                      <input className="qty-text" type="text" value="2" />
                    </div>
                  </td>
                  <td>
                    <a className="remove-product" href="#">
                      <i className="bi bi-x-lg"></i>
                    </a>
                  </td>
                </tr>

                <tr>
                  <th scope="row">
                    <img src="img/bg-img/p5.jpg" alt="" />
                  </th>
                  <td>
                    <h6 className="mb-1">Crispy Biscuit</h6>
                    <span>$0.78 × 9</span>
                  </td>
                  <td>
                    <div className="quantity">
                      <input className="qty-text" type="text" value="9" />
                    </div>
                  </td>
                  <td>
                    <a className="remove-product" href="#">
                      <i className="bi bi-x-lg"></i>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="card-body border-top">
            <Button type="button" btnType="danger" btnClass="w-100">
              Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { myCartLoader };
export default MyCart;
