import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import {
  addToCustomerCartType,
  CartFiltersType,
  CartResponse,
  changeItemCartPayload,
} from "./type";

export const get_carts = async (params?: CartFiltersType) => {
  const { data } = await axiosInstance.get<CartResponse>(API_ROUTES.cart.get, {
    params,
  });

  return data;
};

export const order_customer = async () => {
  const { data } = await axiosInstance.post(API_ROUTES.cart.odrder);

  return data;
};

export const add_to_cart = async (payload: addToCustomerCartType) => {
  const { data } = await axiosInstance.post(API_ROUTES.cart.add, payload);

  return data;
};

export const remove_cart = async (payload: any) => {
  const { data } = await axiosInstance.delete(API_ROUTES.cart.remove, {
    data: payload,
  });

  return data;
};

export const change_item = async (payload: changeItemCartPayload) => {
  const { data } = await axiosInstance.delete(API_ROUTES.cart.change, {
    data: payload,
  });

  return data;
};
