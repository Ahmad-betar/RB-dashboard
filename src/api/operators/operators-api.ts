import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import {
  AddOperatorRequest,
  OperatorFilterParams,
  OperatorsResponse,
} from "./type";

export const get_operators = async (params?: OperatorFilterParams) => {
  const { data } = await axiosInstance.get<OperatorsResponse>(
    API_ROUTES.operator.get,
    { params }
  );

  return data;
};

export const add_operator = async (payload: AddOperatorRequest) => {
  const { data } = await axiosInstance.post<AddOperatorRequest>(
    API_ROUTES.operator.add,
    payload
  );

  return data;
};
export const delete_operator = async (id: string) => {
  const { data } = await axiosInstance.delete(API_ROUTES.operator.delete + id);

  return data;
};
