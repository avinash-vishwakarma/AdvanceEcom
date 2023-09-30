import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import TextInput from "../../../components/ui/Form/TextInput";
import useSendRequest from "../../../hooks/useSendRequest";
import { useDispatch } from "react-redux";
import { setToaster } from "../../../app/stateSlice/toasterAlertStateSlice";
import Button from "../../../components/ui/Genral/Button";

const AdminUpdateCategory = () => {
  const category = useLoaderData();
  const [request, isLoading, response, error] = useSendRequest();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateCategoryHandler = (e) => {
    e.preventDefault();

    const updateFormData = new FormData(e.target);
    updateFormData.append("_method", "put");
    request({
      url: `/api/admin/category/${category.id}`,
      method: "post",
      data: updateFormData,
      headers: {
        "Content-type": "multipart/formdata",
      },
    });
  };

  useEffect(() => {
    if (response) {
      dispatch(
        setToaster({
          type: "success",
          title: "Category Updated Successfully",
          body: "",
        })
      );

      navigate("/admin/categorys", {
        replace: true,
      });
    }
  }, [response]);

  return (
    <div className="container">
      {/* <!-- Page Title --> */}
      <div className="container">
        <div className="element-heading">
          <h6>Update Category : {category.name}</h6>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={updateCategoryHandler}>
            <TextInput
              placeholder="Enter Category Name"
              name="name"
              value={category.name}
            />
            <TextInput
              placeholder="Enter Icon Class"
              name="icon"
              value={category.icon}
            />

            <i className={category.icon} />

            <Button type="submit" isLoading={isLoading}>
              Update Category
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateCategory;
