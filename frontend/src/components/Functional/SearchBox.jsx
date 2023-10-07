import React, { useState } from "react";

const SearchBox = () => {
  const [searchText, setSearchTextUser] = useState("");
  const inputChangeHandler = (e) => {
    setSearchTextUser(e.target.value);
  };

  const searchClickHandler = () => {
    console.log(searchText);
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
