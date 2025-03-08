import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { bannerPayload, bannerResponse } from "./type";

export const get_banner = async () => {
  const { data } = await axiosInstance.get<bannerResponse>(
    API_ROUTES.banner.get
  );

  return data;
};

export const add_banner = async (payload: bannerPayload) => {
  const { data } = await axiosInstance.post(API_ROUTES.banner.add, payload);

  return data;
};
