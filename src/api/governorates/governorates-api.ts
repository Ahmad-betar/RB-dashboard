import { API_ROUTES } from "../api-routes";
import { API_BASE_URL, axiosInstance } from "../axios";

export const get_governorates = async (id: string) => {
  const { data } = await axiosInstance.get(
    API_BASE_URL + API_ROUTES.location.governorates.getOne + id
  );

  return data;
};

export const add_governorate = async (params: any) => {
  const { data } = await axiosInstance.post(
    API_BASE_URL + API_ROUTES.location.governorates.add,
    params
  );

  return data;
};

export const delete_governorate = async (id: string) => {
  const { data } = await axiosInstance.delete(
    API_BASE_URL + API_ROUTES.location.governorates.delete + id
  );

  return data;
};
