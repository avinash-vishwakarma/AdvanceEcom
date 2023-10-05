import React, { useEffect } from "react";
import TextInput from "../../../components/ui/Form/TextInput";
import Button from "../../../components/ui/Genral/Button";
import useSendRequest from "../../../hooks/useSendRequest";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/ui/Form/Alert";

const AdminAddCateogry = ({}) => {
  const [request, isLoading, response, error] = useSendRequest();
  const navigate = useNavigate();

  const addCategoryHandler = (e) => {
    e.preventDefault();

    const categoryFormData = new FormData(e.target);
    request({
      url: "api/admin/category",
      method: "post",
      data: categoryFormData,
      headers: {
        "Content-type": "multipart/formdata",
      },
    });
  };

  useEffect(() => {
    if (response) {
      navigate(-1, {
        replace: true,
      });
    }
  }, [response]);

  return (
    <div className="container">
      {/* <!-- Page Title --> */}
      <div className="container">
        <div className="element-heading">
          <h6>Add New Category</h6>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <Alert error={error} />
          <form onSubmit={addCategoryHandler}>
            <TextInput placeholder="Enter Category Name" name="name" />
            <TextInput placeholder="Enter Icon Class" name="icon" />

            <Button type="submit" isLoading={isLoading}>
              Add Category
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddCateogry;
