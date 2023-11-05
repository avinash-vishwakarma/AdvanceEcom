import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchText, setSearchTextUser] = useState("");
  const navigate = useNavigate();
  const inputChangeHandler = (e) => {
    setSearchTextUser(e.target.value);
  };

  const searchClickHandler = async () => {
    navigate(`/products?search=${searchText}`);
  };

  return (
    <div className="form-group mb-4 d-flex">
      <input
        className="form-control"
        id="elementsSearchInput"
        type="text"
        placeholder="Search element..."
        value={searchText}
        onChange={inputChangeHandler}
      />
      <button className="btn btn-primary" onClick={searchClickHandler}>
        <i className="bi bi-search"></i>
      </button>
    </div>
  );
};

export default SearchBox;
