import React from "react";

const FileUploadCard = ({ setImages }) => {
  const ImageUploadHandler = (e) => {
    const selectedFile = e.target.files[0];
    selectedFile.clientKey = selectedFile.name + Math.random();
    setImages((old) => {
      return [...old, selectedFile];
    });
  };
  return (
    <div className="card">
      <div className="card-body">
        <div className="file-upload-card">
          <h5 className="mt-2 mb-4">Upload your files</h5>

          {/* <!-- Form --> */}
          <form action="#" method="GET">
            <div className="form-file">
              <input
                className="form-control d-none"
                id="imageUpload"
                type="file"
                onChange={ImageUploadHandler}
              />
              <label
                className="form-file-label justify-content-center"
                htmlFor="imageUpload"
              >
                <span className="form-file-button btn btn-primary shadow w-100">
                  <i className="bi bi-cloud-plus-fill px-2"></i>Add Image
                </span>
              </label>
            </div>
          </form>

          <h6 className="mt-4 mb-0">Supported files</h6>
          <small>.jpg .png .jpeg .gif</small>
        </div>
      </div>
    </div>
  );
};

export default FileUploadCard;
