import React from "react";
import { Link } from "react-router-dom";
import PaginationLink from "./PaginationLink";

const Pagination = ({ links }) => {
  return (
    <div className="shop-pagination pt-3">
      <div className="container">
        <div className="card">
          <div className="card-body py-3">
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-two justify-content-center">
                {links?.map((link, index, array) => {
                  return (
                    <PaginationLink
                      key={index}
                      link={link}
                      index={index}
                      array={array}
                    />
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
