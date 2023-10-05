import React, { useEffect, useState } from "react";
import { setToaster } from "../../../app/stateSlice/toasterAlertStateSlice";
import TextInput from "../../../components/ui/Form/TextInput";
import { useLoaderData, useNavigate } from "react-router-dom";
import BadgeList from "../../../components/ui/Lists/BadgeList";
import Button from "../../../components/ui/Genral/Button";
import useSendRequest from "../../../hooks/useSendRequest";
import { useDispatch } from "react-redux";
import Alert from "../../../components/ui/Form/Alert";
import UploadImageSlider from "../../../components/ui/Swiper/UploadImageSlider";

const AdminAddProduct = () => {
  const { product, categorys } = useLoaderData();
  const [selectedCategorys, setSelectedCategorys] = useState(product.categorys);
  const dispatch = useDispatch();
  const [request, isLoading, response, error] = useSendRequest();
  const navigate = useNavigate();
  const [images, setImages] = useState(product.images);

  const editProductHandler = (e) => {
    e.preventDefault();
    // check if atleast one cateory is present or not
    if (selectedCategorys.length === 0) {
      // show an fron end validation for { no cateory selected }
      return;
    }
    const productFormData = new FormData(e.target);
    productFormData.append(
      "categorys",
      JSON.stringify(selectedCategorys.map((category) => category.id))
    );

    images.forEach((image, index) => {
      if (!image.id) {
        productFormData.append(`image${index}`, image);
      }
    });

    productFormData.append("_method", "put");
    request({
      url: `api/admin/product/${product.id}`,
      method: "post",
      data: productFormData,
      headers: {
        "Content-Type": "multipart/formdata",
      },
    });
  };

  const categoryChangeHandler = (e) => {
    const selectedId = +e.target.value;
    // check if it already present in
    const isPresent = selectedCategorys.find(
      (category) => category.id === selectedId
    );
    if (isPresent) {
      return;
    }
    const selectedCategory = categorys.find((item) => item.id === selectedId);
    setSelectedCategorys((old) => [...old, selectedCategory]);
  };

  const removeSelectedCategoryHandler = (category) => {
    setSelectedCategorys((oldCategorys) => {
      return oldCategorys.filter((item) => item.id !== category.id);
    });
  };

  useEffect(() => {
    if (response) {
      dispatch(
        setToaster({
          type: "success",
          title: "Product Updated",
          body: "Product Updated Successfully",
        })
      );
      navigate(`/admin/product/${response.data.id}`);
    }
  }, [response]);

  return (
    <div className="container">
      <div className="element-heading">
        <h6>Update Product</h6>
      </div>

      <div>
        <UploadImageSlider images={images} setImages={setImages} />
      </div>

      {selectedCategorys.length > 0 && (
        <BadgeList
          list={selectedCategorys}
          onAnyClick={removeSelectedCategoryHandler}
          title="Selected Categorys"
        />
      )}

      <form onSubmit={editProductHandler}>
        <Alert error={error} />

        <div className="form-group">
          <label className="form-label">select product Categorys</label>
          <select className="form-select" onChange={categoryChangeHandler}>
            {categorys.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">select publish State</label>
          <select
            className="form-select"
            name="state"
            defaultValue={product.state}
          >
            <option value="active">Active</option>
            <option value="disable">Disabled</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        <TextInput
          name="title"
          title="Enter Title"
          placeholder="Enter  Title"
          value={product.title}
        />

        <TextInput
          name="heading"
          title="Enter Heading"
          placeholder="Enter Heading"
          value={product.heading}
        />
        <TextInput
          name="price"
          title="Enter Price"
          placeholder="Enter  Price"
          value={product.price}
        />

        <div className="form-group">
          <label className="form-label">Enter Product Description</label>
          <textarea
            className="form-control"
            name="description"
            cols="3"
            rows="5"
            placeholder="Write something..."
            defaultValue={product.description}
          ></textarea>
        </div>

        <Button type="submit" isLoading={isLoading} btnType="primary">
          <i className="bi bi-pencil-square mx-2" />
          Update Product
        </Button>
      </form>
    </div>
  );
};

export default AdminAddProduct;
