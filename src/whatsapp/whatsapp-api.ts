import { API_ROUTES } from "@/api/api-routes";
import { axiosInstance } from "@/api/axios";

export const add_message = async (payload: any) => {
  const { data } = await axiosInstance.post(API_ROUTES.message.add, payload);

  return data;
};
