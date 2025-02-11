import axsio from "axios";

export const BASE_URL = "https://commonsensesqaure.pythonanywhere.com/";
export const API_BASE_URL = "https://rb-o8z2.onrender.com/";

export const axiosInstance = axsio.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  // config.headers.Authorization = "Bearer " + localStorage.getItem("token");
  config.headers.Authorization =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11aGFtbWFkay5oMS4xLjIwMDFAZ21haWwuY29tIiwidXNlcklkIjoiNjc5Mzg2MzU5MzM3MzRhNzA1NDdjZjIyIiwiaWF0IjoxNzM5MDQ5NDg5LCJleHAiOjE3NDE2NDE0ODl9.uT3NSCuSlfZXLLCOBGhRqMwFhHAlyNknqJuZB3KT8tU";

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (errors) => {
    // if (errors.response.status === 401) {
    //   window.location.href = "/sign-in";
    // }
    return Promise.reject(errors);
  }
);
