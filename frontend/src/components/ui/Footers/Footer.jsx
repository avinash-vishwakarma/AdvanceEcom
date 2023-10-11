import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer-nav-area" id="footerNav">
      <div className="container px-0">
        {/* <!-- Footer Content --> */}
        <div className="footer-nav position-relative">
          <ul className="h-100 d-flex align-items-center justify-content-between ps-0">
            <li className="active">
              <NavLink to="/">
                <i className="bi bi-house"></i>
                <span>Home</span>
              </NavLink>
            </li>

            <li>
              <a href="pages.html">
                <i className="bi bi-collection"></i>
                <span>Pages</span>
              </a>
            </li>

            <li>
              <a href="elements.html">
                <i className="bi bi-folder2-open"></i>
                <span>Elements</span>
              </a>
            </li>

            <li>
              <NavLink to="/user-profile">
                <i className="bi bi-person-circle"></i>
                <span>Profile</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/my-cart">
                <i className="bi bi-cart"></i>
                <span>Cart</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
