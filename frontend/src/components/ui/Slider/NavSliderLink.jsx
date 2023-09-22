import React from "react";
import { NavLink } from "react-router-dom";

const NavSliderLink = ({ to, icon, text }) => {
  return (
    <li>
      <NavLink to={to}>
        <i className={icon}></i> {text}
      </NavLink>
    </li>
  );
};

export default NavSliderLink;
