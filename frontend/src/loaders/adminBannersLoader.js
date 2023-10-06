import axios from "axios";

const adminBannersLoader = async () => {
  const response = await axios.get("api/admin/banner");
  return response.data;
};

export default adminBannersLoader;
