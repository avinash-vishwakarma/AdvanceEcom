import React from "react";

const SortPagination = ({ currentPage, lastPage }) => {
  return (
    <div className="shop-pagination pb-3">
      <div className="container">
        <div className="card">
          <div className="card-body p-2">
            <div className="d-flex align-items-center justify-content-between">
              <small className="ms-1">
                Showing {currentPage} of {lastPage}
              </small>
              <form action="#">
                <select
                  className="pe-4 form-select form-select-sm"
                  id="defaultSelectSm"
                  name="defaultSelectSm"
                  aria-label="Default select example"
                  defaultValue="1"
                >
                  <option value="1">Sort by Newest</option>
                  <option value="2">Sort by Older</option>
                  <option value="3">Sort by Ratings</option>
                  <option value="4">Sort by Sales</option>
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
