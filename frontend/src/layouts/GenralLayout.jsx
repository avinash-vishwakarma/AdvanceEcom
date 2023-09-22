import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// components
import Header from "../components/ui/Headers/Header";
import NavSlider from "../components/ui/Slider/NavSlider";
import Footer from "../components/ui/Footers/Footer";

const GenralLayout = () => {
  const [showSlider, setShowSlider] = useState(false);

  const toggleSlider = () => {
    setShowSlider((old) => !old);
  };

  return (
    <React.Fragment>
      <Header toggleSlider={toggleSlider} />
      <NavSlider
        showSlider={showSlider}
        closeSlider={setShowSlider.bind(null, false)}
      />
      <div className="page-content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default GenralLayout;
