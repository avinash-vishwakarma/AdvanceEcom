import axios from "axios";

const homePageLoader = async () => {
  const response = await axios.get("/api/banners");
  return response.data;
};

export default homePageLoader;
