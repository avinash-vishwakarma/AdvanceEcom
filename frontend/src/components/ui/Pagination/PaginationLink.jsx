import React from "react";
import { Link, useLocation } from "react-router-dom";

const PaginationLink = ({ link, index, array }) => {
  const location = useLocation();

  const serchParams = link.url?.split("?")[1];
  const path = new URLSearchParams(serchParams);

  const getPageLinkHandler = () => {
    const queries = new URLSearchParams(location.search);
    queries.set("page", path.get("page"));
    return `?${queries.toString()}`;
  };

  if (index === 0) {
    return (
      <li className={`page-item ${link.active && "active"}`}>
        <Link
          onClick={scrollTo.bind(null, 0, 0)}
          to={getPageLinkHandler()}
          className={`page-link ${!path.has("page") && "disabled"}`}
          href="#"
          aria-label="Previous"
        >
          <i className="bi bi-chevron-left"></i>
        </Link>
      </li>
    );
  } else if (index === array.length - 1) {
    return (
      <li className={`page-item ${link.active && "active"}`}>
        <Link
          onClick={scrollTo.bind(null, 0, 0)}
          to={getPageLinkHandler()}
          className={`page-link ${!path.has("page") && "disabled"}`}
          href="#"
          aria-label="Next"
        >
          <i className="bi bi-chevron-right"></i>
        </Link>
      </li>
    );
  }

  return (
    <li className={`page-item ${link.active && "active"}`}>
      <Link
        onClick={scrollTo.bind(null, 0, 0)}
        to={getPageLinkHandler()}
        className="page-link"
        href="#"
      >
        {link.label}
      </Link>
    </li>
  );
};

export default PaginationLink;
