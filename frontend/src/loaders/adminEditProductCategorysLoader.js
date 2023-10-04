import adminProductLoader from "./adminProductLoader";
import cateoryPageLoader from "./categoryPageLoader";

const adminEditProductCategorysLoader = async (request) => {
  const product = await adminProductLoader(request);
  const categorys = await cateoryPageLoader();
  return { product, categorys };
};

export default adminEditProductCategorysLoader;
