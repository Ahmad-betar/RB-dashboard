import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { getCouponsType } from "./type";

export const get_coupons = async () => {
  const { data } = await axiosInstance.get<getCouponsType>(
    API_ROUTES.coupon.get
  );

  return data;
};

export const add_coupon = async (params: any) => {
  const { data } = await axiosInstance.post(
    API_ROUTES.coupon.add,
    params
  );

  return data;
};

export const delete_coupon = async (id: string) => {
  const { data } = await axiosInstance.delete(
    API_ROUTES.coupon.delete + id
  );

  return data;
};
