import { API_ROUTES } from "../api-routes";
import { API_BASE_URL, axiosInstance } from "../axios";

export const get_products = async (params: any) => {
  const { data } = await axiosInstance.get(
    API_BASE_URL + API_ROUTES.product.get,
    params
  );

  return data;
};

export const get_one_product = async (params: any) => {
  const { data } = await axiosInstance.get(
    API_BASE_URL + API_ROUTES.product.getOne
  );

  return data;
};

export const add_products = async (params: any) => {
  const { data } = await axiosInstance.post(
    API_BASE_URL + API_ROUTES.product.create
  );

  return data;
};

export const edit_products = async (params: any) => {
  const { data } = await axiosInstance.put(
    API_BASE_URL + API_ROUTES.product.edit
  );

  return data;
};

export const delete_products = async (params: any) => {
  const { data } = await axiosInstance.delete(
    API_BASE_URL + API_ROUTES.product.delete
  );

  return data;
};
