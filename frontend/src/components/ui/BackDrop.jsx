import React from "react";

const BackDrop = ({ showSlider, closeSlider }) => {
  return (
    showSlider && (
      <div className="offcanvas-backdrop fade show" onClick={closeSlider}></div>
    )
  );
};

export default BackDrop;
