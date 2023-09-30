import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import BackDrop from "../BackDrop";
import NavSliderLink from "./NavSliderLink";
import { useSelector } from "react-redux";
import AdminSliderLinks from "./AdminSliderLinks.jsx";

// Helpers
import hasRole from "../../../Helper/hasRole";

const NavSlider = ({ showSlider, closeSlider }) => {
  const [sliderClass, setSliderClass] = useState("");

  const auth = useSelector((store) => store.auth);

  const isAdmin = hasRole(auth.user?.roles, "Admin");

  useEffect(() => {
    if (showSlider) {
      setSliderClass("showing");
      setTimeout(() => {
        setSliderClass("show");
      }, 300);
    } else {
      if (sliderClass === "") return;
      setSliderClass("hiding");
      setTimeout(() => {
        setSliderClass("");
      }, 300);
    }
  }, [showSlider]);

  return (
    <>
      <div
        className={`offcanvas offcanvas-start ${sliderClass}`}
        id="affanOffcanvas"
        data-bs-scroll="true"
        aria-labelledby="affanOffcanvsLabel"
      >
        <button
          className="btn-close btn-close-white text-reset"
          type="button"
          onClick={closeSlider}
        ></button>

        <div className="offcanvas-body p-0">
          <div className="sidenav-wrapper">
            {/* <!-- Sidenav Profile --> */}
            <div className="sidenav-profile bg-gradient">
              <div className="sidenav-style1"></div>

              {/* <!-- User Thumbnail --> */}
              <div className="user-profile">
                <img src="/img/bg-img/2.jpg" alt="" />
              </div>

              {/* <!-- User Info --> */}
              <div className="user-info">
                <h6 className="user-name mb-0">Affan Islam</h6>
                <span>CEO, Designing World</span>
              </div>
            </div>

            {/* <!-- Sidenav Nav --> */}
            <ul className="sidenav-nav ps-0">
              <NavSliderLink to="/" icon="bi bi-house" text="Homes" />

              {!auth.isLogin && (
                <NavSliderLink
                  to="/login"
                  icon="bi bi-box-arrow-in-right"
                  text="Login"
                />
              )}
              {!auth.isLogin && (
                <NavSliderLink
                  to="/register"
                  icon="bi bi-box-arrow-in-right"
                  text="Register"
                />
              )}

              {isAdmin && <AdminSliderLinks />}

              {auth.isLogin && (
                <NavSliderLink
                  to="/logout"
                  icon="bi bi-box-arrow-in-left"
                  text="logout"
                />
              )}
            </ul>

            {/* <!-- Social Info --> */}
            <div className="social-info-wrap">
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>

            {/* <!-- Copyright Info --> */}
            <div className="copyright-info">
              <p>
                <span id="copyrightYear"></span>
                &copy; Made by <a href="#">Designing World</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {createPortal(
        <BackDrop showSlider={showSlider} closeSlider={closeSlider} />,
        document.querySelector("body")
      )}
    </>
  );
};

export default NavSlider;
