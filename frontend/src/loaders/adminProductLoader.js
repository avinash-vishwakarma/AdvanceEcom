import axios from "axios";

const adminProductLoader = async ({ params }) => {
  const id = params.id;
  const response = await axios.get(`/api/admin/product/${id}`);
  return response.data;
};

export default adminProductLoader;
