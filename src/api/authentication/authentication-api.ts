import { API_BASE_URL } from "./../axios";
import axios from "axios";
import { API_ROUTES } from "../api-routes";
import { addAdminType, loginType, resetPassword } from "./type";

export const login = async (params: loginType) => {
  const data = await axios.post<{ JWT: string }>(
    API_BASE_URL + API_ROUTES.auth.login,
    params
  );

  // console.log(headers);
  return data;
};

export const add_admin = async (params: addAdminType) => {
  const { data } = await axios.post(API_BASE_URL + API_ROUTES.auth.add, params);

  return data;
};

export const request_reset_password = async (payload: { email: string }) => {
  const { data } = await axios.post<{ message: string }>(
    API_BASE_URL + API_ROUTES.auth.requestPasswordReset,
    payload
  );

  return data;
};

export const reset_password = async (payload: resetPassword) => {
  const { data } = await axios.post<{ message: string }>(
    API_BASE_URL + API_ROUTES.auth.resetPassword,
    payload
  );

  return data;
};
