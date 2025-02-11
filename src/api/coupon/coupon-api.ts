import { API_ROUTES } from "../api-routes";
import { API_BASE_URL, axiosInstance } from "../axios";

export const get_coupons = async () => {
  const { data } = await axiosInstance.get(
    API_BASE_URL + API_ROUTES.coupon.get
  );

  return data;
};

export const add_coupon = async (params: any) => {
  const { data } = await axiosInstance.post(
    API_BASE_URL + API_ROUTES.coupon.add,
    params
  );

  return data;
};

export const delete_coupon = async (id: string) => {
  const { data } = await axiosInstance.delete(
    API_BASE_URL + API_ROUTES.coupon.delete + id
  );

  return data;
};
