// api.ts

import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { AddPixelRequest, Pixel } from "./type";

// Add a new pixel
export const addPixel = async (pixelData: AddPixelRequest) => {
  const { data } = await axiosInstance.post(API_ROUTES.pixel.add, pixelData);
  return data;
};

// Get the pixel data
export const getPixel = async () => {
  const { data } = await axiosInstance.get<Pixel>(API_ROUTES.pixel.get);
  return data;
};
