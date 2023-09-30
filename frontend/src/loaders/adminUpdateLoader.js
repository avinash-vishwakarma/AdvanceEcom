import axios from "axios";

const adminUpdateLoader = async ({ params: { id } }) => {
  const response = await axios.get(`/api/admin/category/${id}`);
  return response.data;
};

export default adminUpdateLoader;
