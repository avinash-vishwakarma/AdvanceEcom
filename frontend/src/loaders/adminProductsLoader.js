import axios from "axios";

const adminProductsLoader = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams.get("category");

  const response = await axios.get(
    `/api/admin/product?category=${searchParams}`
  );
  return response.data;
};

export default adminProductsLoader;
