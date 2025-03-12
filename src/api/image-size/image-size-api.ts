import { API_ROUTES } from "../api-routes";
import { axiosInstance } from "../axios";
import { imageType } from "../uplaod-file.ts/type";

export const getImageSize = async () => {
  const { data } = await axiosInstance<{ image: imageType }>(
    API_ROUTES.imageSize.get
  );

  return data;
};

export const addImageSize = async (payload: any) => {
  const { data } = await axiosInstance.post(API_ROUTES.imageSize.add, payload);

  return data;
};
