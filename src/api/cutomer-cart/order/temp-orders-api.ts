import { axiosInstance } from "@/api/axios";
import { GetTempOrdersResponse, GetTempOrderResponse } from "./type";
import { API_ROUTES } from "@/api/api-routes";

// Create a temporary order
export const create_temp_order = async (payload: any) => {
  const { data } = await axiosInstance.post(
    API_ROUTES.cart.createOrder,
    payload
  );
  return data;
};

// Get all temporary orders
export const get_temp_orders = async (params?: {
  page?: number;
  limit?: number;
}) => {
  const { data } = await axiosInstance.get<GetTempOrdersResponse>(
    API_ROUTES.cart.getOrders,
    {
      params,
    }
  );
  return data;
};

// Get a single temporary order by ID
export const get_temp_order = async (id: string) => {
  const { data } = await axiosInstance.get<GetTempOrderResponse>(
    API_ROUTES.cart.getOneOrder + id
  );
  return data;
};
