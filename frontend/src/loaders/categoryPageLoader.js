import axios from "axios";

const cateoryPageLoader = async () => {
  console.log("category page loader ");
  const response = await axios({
    url: "/api/admin/category",
    method: "get",
  });

  return response.data;
};

export default cateoryPageLoader;
