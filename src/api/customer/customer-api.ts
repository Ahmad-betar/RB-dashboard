import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { CustomersResponse } from "./type";

export const get_customers = async () => {
  const { data } = await axiosInstance.get<CustomersResponse>(
    API_ROUTES.customers.get
  );

  return data;
};
