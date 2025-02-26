import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { addProductType, getProductType, ProductType } from "./type";

export const get_products = async () => {
  const { data } = await axiosInstance.get<getProductType>(
    API_ROUTES.product.get
    // params
  );

  return data;
};

export const get_one_product = async (id: string) => {
  const { data } = await axiosInstance.get<{ data: ProductType }>(
    API_ROUTES.product.getOne + id
  );

  return data;
};

export const add_products = async (body: addProductType) => {
  const { data } = await axiosInstance.post<addProductType>(
    API_ROUTES.product.create,
    body
  );

  return data;
};

export const edit_products = async ({
  id,
  params,
}: {
  id: string;
  params: addProductType;
}) => {
  const { data } = await axiosInstance.put(
    API_ROUTES.product.edit + id,
    params
  );

  return data;
};

export const delete_products = async (id: string) => {
  const { data } = await axiosInstance.delete(API_ROUTES.product.delete + id);

  return data;
};
