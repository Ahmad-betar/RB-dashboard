import { API_BASE_URL, axiosInstance } from "../axios";
import { API_ROUTES } from "../api-routes";

export const get_states = async (params: any) => {
  const { data } = await axiosInstance.get(
    API_BASE_URL + API_ROUTES.location.state.get,
    params
  );

  return data;
};

export const add_state = async (params: any) => {
  const { data } = await axiosInstance.post(
    API_BASE_URL + API_ROUTES.location.state.create,
    params
  );

  return data;
};

export const delete_state = async (id: string) => {
  const { data } = await axiosInstance.delete(
    API_BASE_URL + API_ROUTES.location.state.delete + id
  );

  return data;
};
