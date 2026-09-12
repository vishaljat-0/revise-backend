import { createProductApi, getProductsApi } from "../services/products.api.js";
import { setProducts } from "../state/productSlice.js";

import { useDispatch } from "react-redux";

const useProduct = () => {
  const dispatch = useDispatch();
  const handlCreateProduct = async (form) => {
    const response = await createProductApi(form);
    return response.product;
  };

  const getProducts = async () => {
    const response = await getProductsApi();
    dispatch(setProducts(response.products));

    return response.products;
  };
  return {
    handlCreateProduct,
    getProducts,
  };
};

export default useProduct;
