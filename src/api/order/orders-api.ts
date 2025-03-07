import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { GetOrdersParams, GetOrdersResponse, OrderType } from "./type";

export const get_orders = async (params?: GetOrdersParams) => {
  const { data } = await axiosInstance.get<GetOrdersResponse>(
    API_ROUTES.orders.get,
    { params }
  );

  return data;
};

export const get_one_order = async (id: string) => {
  const { data } = await axiosInstance.get<OrderType>(
    API_ROUTES.orders.getOne + id
  );

  return data;
};

export const get_status = async () => {
  const { data } = await axiosInstance.get(API_ROUTES.orders.status);

  return data;
};

export const change_order_status = async ({
  id,
  payload,
}: {
  id: string;
  payload: any;
}) => {
  const { data } = await axiosInstance.put(
    API_ROUTES.orders.changeStatus + id,
    {
      status: payload,
    }
  );

  return data;
};
