import React from "react";

const Header = ({ toggleSlider }) => {
  return (
    <div className="header-area" id="headerArea">
      <div className="container">
        {/*  Header Content  */}
        <div className="header-content header-style-five position-relative d-flex align-items-center justify-content-between">
          {/*  Logo Wrapper  */}
          <div className="logo-wrapper">
            <a href="home.html">
              <img src="img/core-img/logo.png" alt="" />
            </a>
          </div>

          {/*  Navbar Toggler  */}
          <div
            className="navbar--toggler"
            id="affanNavbarToggler"
            onClick={toggleSlider}
          >
            <span className="d-block"></span>
            <span className="d-block"></span>
            <span className="d-block"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
