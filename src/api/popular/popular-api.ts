import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { addPopularPayload, getPopularResponse } from "./type";

// Get all popular items
export const get_populars = async () => {
  const { data } = await axiosInstance.get<getPopularResponse[]>(
    API_ROUTES.popular.get
  );
  return data;
};

// Add a new popular item
export const add_popular = async (payload: addPopularPayload) => {
  const { data } = await axiosInstance.post(API_ROUTES.popular.add, payload);
  return data;
};

// Delete a popular item by ID
export const delete_popular = async (id: string) => {
  const { data } = await axiosInstance.delete(
    `${API_ROUTES.popular.delete}/${id}`
  );
  return data;
};
