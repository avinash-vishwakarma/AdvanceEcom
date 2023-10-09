import React from "react";

const SortPagination = ({ currentPage, lastPage, sortChangeHandler }) => {
  return (
    <div className="shop-pagination pb-3">
      <div className="container">
        <div className="card">
          <div className="card-body p-2">
            <div className="d-flex align-items-center justify-content-between">
              <small className="ms-1">
                Showing {currentPage} of {lastPage}
              </small>
              <form action="">
                <select
                  className="pe-4 form-select form-select-sm"
                  onChange={sortChangeHandler}
                >
                  <option value="lth">Price : Low to High</option>
                  <option value="htl">Price : High to Low</option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortPagination;
