import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { GetOrdersParams, GetOrdersResponse } from "./type";

export const get_orders = async (params?: GetOrdersParams) => {
  const { data } = await axiosInstance.get<GetOrdersResponse>(
    API_ROUTES.orders.get,
    { params }
  );

  return data;
};

export const get_one_order = async (id: string) => {
  const { data } = await axiosInstance.get(API_ROUTES.orders.getOne + id);

  return data;
};

export const get_status = async () => {
  const { data } = await axiosInstance.get(API_ROUTES.orders.status);

  return data;
};
