import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";

export const get_cities = async (id: string) => {
  const { data } = await axiosInstance.get(
    API_ROUTES.location.city.getOne + id
  );

  return data;
};

export const add_city = async (params: any) => {
  const { data } = await axiosInstance.post(
    API_ROUTES.location.city.add,
    params
  );

  return data;
};

export const delete_city = async (id: string) => {
  const { data } = await axiosInstance.delete(
    API_ROUTES.location.city.delete + id
  );

  return data;
};
