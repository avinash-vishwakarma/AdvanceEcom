import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../App/stateSlice/toasterAlertStateSlice";

const CategoryListItem = ({ name, icon, id, onRemove }) => {
  const dispatch = useDispatch();
  const categoryDeleteHandler = () => {
    axios.delete(`api/admin/category/${id}`).then((respnose) => {
      dispatch(
        setToaster({
          type: "success",
          title: "Category Deleted successfully",
        })
      );

      onRemove(id);
    });
  };

  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <Link className="d-flex">
        <i className={`${icon} mx-2 d-block`} />
        {name}
      </Link>
      <div className="d-flex">
        <Link
          className="badge bg-primary rounded-pill d-block p-2 mx-2"
          to={`update/${id}`}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
        <span
          onClick={categoryDeleteHandler}
          className="badge bg-danger rounded-pill d-block p-2"
        >
          <i className="bi bi-trash3"></i>
        </span>
      </div>
    </li>
  );
};
const AdminCategorys = () => {
  const loadedCategorys = useLoaderData();
  const [categorys, setCategorys] = useState(loadedCategorys);
  const onRemoveCateogryHanlder = (id) => {
    setCategorys((oldCateogys) => {
      const updatedCategorys = oldCateogys.filter((item) => {
        return item.id !== id;
      });
      return updatedCategorys;
    });
  };

  return (
    <div className="container">
      <Link className="btn btn-primary w-100" to="add">
        <i className="bi bi-plus-circle px-2 "></i>Add New Categorys
      </Link>

      <div className="element-heading pt-4">
        <h6>All Product Categorys</h6>
      </div>

      <div className="card">
        <div className="card-body">
          <ul className="list-group">
            {categorys.map((cateory) => (
              <CategoryListItem
                key={cateory.id}
                {...cateory}
                onRemove={onRemoveCateogryHanlder}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminCategorys;
